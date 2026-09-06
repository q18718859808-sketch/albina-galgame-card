export interface Krea2StyleLora {
  order: number;
  name: string;
  strength: number;
}

export const KREA2_PRODUCTION_STYLE_LORAS: readonly Krea2StyleLora[];
export const KREA2_COMFY_GATEWAY_DEFAULTS: Readonly<Record<string, unknown>>;
export function sha256(value: string | Uint8Array): string;
export function stableJson(value: unknown): string;
export function normalizeLocalComfyUrl(value?: string): string;
export function normalizeKrea2ComfyGatewayUrl(value?: string): string;
export function getKrea2ComfyGatewayConfig(env?: Record<string, string | undefined>): Readonly<Record<string, unknown>>;
export function isKrea2ComfyGatewayEnabled(env?: Record<string, string | undefined>): boolean;
export function getKrea2GatewayStatus(options?: Record<string, unknown>): Promise<any>;
export function getKrea2GatewayQueue(options?: Record<string, unknown>): Promise<any>;
export function interruptKrea2Gateway(options?: Record<string, unknown>): Promise<any>;
export function getKrea2GatewayRecoverySnapshot(options?: Record<string, unknown>): Promise<any>;
export function loadVerifiedKrea2Baseline(options?: Record<string, unknown>): Promise<any>;
export function buildKrea2Workflow(baseline: any, options: Record<string, unknown>): any;
export function buildKrea2ImageEditWorkflow(baseline: any, options: Record<string, unknown>): any;
export function buildKrea2ReferenceConditioningWorkflow(baseline: any, options: Record<string, unknown>): any;
export function buildKrea2RegionalCompositeWorkflow(options?: Record<string, unknown>): any;
export function buildKrea2TextOverlayWorkflow(options: Record<string, unknown>): any;
export function validateKrea2ProductionStyleChain(workflow: any, options?: Record<string, unknown>): Krea2StyleLora[];
export function validateKrea2CanonicalLatentRestyle(workflow: any, options?: Record<string, unknown>): true;
export function validateKrea2CanonicalControlRestyle(workflow: any): true;
export function makeKrea2Receipt(input: Record<string, unknown>): any;
export function recordKrea2Failure(receipt: any, error: unknown, options?: Record<string, unknown>): any;
export function enqueueKrea2Job(workflow: any, options?: Record<string, unknown>): Promise<any>;
export function waitForKrea2Output(promptId: string, options?: Record<string, unknown>): Promise<any>;
export function downloadKrea2Image(image: any, destination: string, options?: Record<string, unknown>): Promise<any>;
export function uploadKrea2Image(sourcePath: string, options?: Record<string, unknown>): Promise<any>;
export function writeKrea2Receipt(jobId: string, receipt: any, options?: Record<string, unknown>): Promise<string>;
export function getKrea2StyleLoraContract(): Krea2StyleLora[];
export function workflowTopology(workflow: Record<string, unknown>): Record<string, unknown>;
export function workflowTopologySha256(workflow: Record<string, unknown>): string;
