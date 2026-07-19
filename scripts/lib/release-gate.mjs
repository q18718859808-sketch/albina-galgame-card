const FINAL_VERSION = '2.0.0';

export function isPrereleaseVersion(version) {
  return typeof version === 'string' && version.includes('-');
}

export function evaluateReleaseGate({ channel, status, repository } = {}) {
  if (!['rc', 'final'].includes(channel)) throw new Error(`Unknown release channel: ${channel}`);
  if (!status || typeof status !== 'object') throw new Error('Release status is required');

  const blockers = [];
  if (repository) {
    if (repository.workingTreeClean === false) blockers.push('git:working-tree-dirty');
    if (!repository.branch) blockers.push('git:detached-head');
  }

  if (channel === 'rc') {
    if (!status.releaseCandidate || !isPrereleaseVersion(status.version)) blockers.push('version:not-prerelease');
    return {
      channel,
      allowed: blockers.length === 0,
      incomplete: status.completeEdition !== true,
      blockers: [...new Set([...blockers, ...(status.completeEdition ? [] : status.completionBlockers ?? [])])],
    };
  }

  if (status.completeEdition !== true) blockers.push('complete-edition:false');
  if (status.releaseCandidate || isPrereleaseVersion(status.version)) blockers.push('version:is-prerelease');
  if (status.version !== FINAL_VERSION) blockers.push(`version:expected-${FINAL_VERSION}`);
  if (repository?.remoteFinalTagExists) blockers.push(`tag:v${FINAL_VERSION}-already-published`);
  if (repository?.localFinalTagCommit && repository.localFinalTagCommit !== repository.head) {
    blockers.push(`tag:v${FINAL_VERSION}-points-elsewhere`);
  }
  blockers.push(...(status.completionBlockers ?? []));

  return {
    channel,
    allowed: [...new Set(blockers)].length === 0,
    incomplete: status.completeEdition !== true,
    blockers: [...new Set(blockers)],
  };
}

export function buildReleaseCommands({ channel, status, repository, remote = 'origin' }) {
  const gate = evaluateReleaseGate({ channel, status, repository });
  if (!gate.allowed) return { ...gate, commands: [] };

  const branchRef = `HEAD:refs/heads/${repository.branch}`;
  if (channel === 'rc') return { ...gate, commands: [['push', remote, branchRef]] };

  const tag = `v${FINAL_VERSION}`;
  const commands = [];
  if (!repository.localFinalTagCommit) commands.push(['tag', '-a', tag, '-m', `Albina ${FINAL_VERSION}`, repository.head]);
  commands.push(['push', remote, branchRef], ['push', remote, `refs/tags/${tag}`]);
  return { ...gate, commands };
}
