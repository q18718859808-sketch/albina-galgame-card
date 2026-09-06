export interface Krea2ProfileAdapterEntry {
  profileId: string;
  implementationStatus: 'implemented' | 'nodes-required' | 'research-only';
  builderId: string | null;
  dispatch: string | null;
  adapterKind: string;
  routeMode?: string;
  [key: string]: unknown;
}

export function loadKrea2ProfileAdapterContract(options?: Record<string, string | undefined>): Promise<{
  contract: Record<string, unknown>;
  index: Record<string, unknown>;
  profiles: Krea2ProfileAdapterEntry[];
}>;
export function getKrea2ProfileAdapter(adapter: { profiles: Krea2ProfileAdapterEntry[] }, profileId: string): Krea2ProfileAdapterEntry;
export function buildKrea2ProfileWorkflow(
  adapter: { profiles: Krea2ProfileAdapterEntry[] },
  profileId: string,
  baseline: Record<string, unknown>,
  options?: Record<string, unknown>,
): { profile: Krea2ProfileAdapterEntry; workflow: Record<string, unknown> };
export function loadAndBuildKrea2ProfileWorkflow(
  profileId: string,
  baseline: Record<string, unknown>,
  options?: Record<string, unknown>,
): Promise<{ profile: Krea2ProfileAdapterEntry; workflow: Record<string, unknown> }>;
export const KREA2_PROFILE_ADAPTER_CONTRACT_PATH: string;
