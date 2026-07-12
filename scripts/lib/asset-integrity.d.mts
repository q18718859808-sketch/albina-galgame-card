export interface IntegrityAsset { id: string; path: string; sha256?: string; bytes?: number }
export function validateAssetIntegrity(assetRoot: string, assets: IntegrityAsset[], pendingIds?: Set<string>): Promise<string[]>;
