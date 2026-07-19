export interface IntegrityAsset { id: string; path: string; mimeType?: string; sha256?: string; bytes?: number }
export function detectAssetMimeType(bytes: Uint8Array): string | undefined;
export function validateAssetIntegrity(assetRoot: string, assets: IntegrityAsset[], pendingIds?: Set<string>): Promise<string[]>;
