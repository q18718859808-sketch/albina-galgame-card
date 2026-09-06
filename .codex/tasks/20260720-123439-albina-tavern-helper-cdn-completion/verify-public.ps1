param(
    [Parameter(Position = 0)]
    [string]$Tag = $(if ($env:ALBINA_CDN_TAG) { $env:ALBINA_CDN_TAG } else { 'v2.0.0' })
)

$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

if ($Tag -notmatch '^v[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$') {
    throw "Invalid CDN tag '$Tag'. Expected a version tag such as v2.0.0."
}

$base = "https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@$Tag"
$proxy = (git config --get http.proxy).Trim()
$tagCommit = (git rev-parse "$Tag^{commit}").Trim()
$remoteRefs = git ls-remote --tags origin "refs/tags/$Tag" "refs/tags/$Tag^{}"
if (-not ($remoteRefs -match [regex]::Escape($tagCommit))) {
    throw "Remote tag $Tag does not resolve to local commit $tagCommit"
}

$tempRoot = Join-Path $env:TEMP "albina-public-verification-$Tag"
New-Item -ItemType Directory -Force -Path $tempRoot | Out-Null
$assets = @(
    @{ Remote = '/card/albina.card.png'; Local = 'card/albina.card.png'; Type = 'image/png' },
    @{ Remote = '/card/albina.card.json'; Local = 'card/albina.card.json'; Type = 'application/json' },
    @{ Remote = '/dist/albina-galgame-card/source/albina-classic-loader.js'; Local = 'dist/albina-galgame-card/source/albina-classic-loader.js'; Type = 'application/javascript' },
    @{ Remote = '/dist/albina-galgame-card/source/albina-source.js'; Local = 'dist/albina-galgame-card/source/albina-source.js'; Type = 'application/javascript' },
    @{ Remote = '/dist/albina-galgame-card/source/albina-source.css'; Local = 'dist/albina-galgame-card/source/albina-source.css'; Type = 'text/css' }
)

foreach ($asset in $assets) {
    $name = Split-Path $asset.Local -Leaf
    $destination = Join-Path $tempRoot $name
    $curlArgs = @('--silent', '--show-error', '--fail', '--max-time', '60', '--output', $destination, '--write-out', '%{http_code}|%{content_type}')
    if ($proxy) { $curlArgs += @('--proxy', $proxy) }
    $response = (& curl.exe @curlArgs "$base$($asset.Remote)").Trim()
    $status, $contentType = $response -split '\|', 2
    if ($status -ne '200' -or -not $contentType.StartsWith($asset.Type)) {
        throw "$name returned HTTP $status with MIME $contentType"
    }
    $localHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $asset.Local).Hash
    $remoteHash = (Get-FileHash -Algorithm SHA256 -LiteralPath $destination).Hash
    if ($localHash -ne $remoteHash) { throw "$name CDN hash mismatch" }
    Write-Output "$name HTTP=200 MIME=$contentType SHA256=$localHash"
}
