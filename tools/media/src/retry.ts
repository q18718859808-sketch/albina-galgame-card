export interface RetryOptions {
  attempts?: number;
  baseDelayMs?: number;
  sleep?: (milliseconds: number) => Promise<void>;
}

interface RetryableError {
  status?: number;
  retryAfterMs?: number;
}

export async function retry<T>(operation: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const attempts = options.attempts ?? 4;
  const baseDelayMs = options.baseDelayMs ?? 500;
  const sleep = options.sleep ?? delay;
  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (attempt === attempts || !isTransient(error)) throw error;
      const described = error as RetryableError;
      await sleep(described.retryAfterMs ?? baseDelayMs * 2 ** (attempt - 1));
    }
  }
  throw lastError;
}

function isTransient(error: unknown): boolean {
  const status = (error as RetryableError | undefined)?.status;
  return (
    status === 408 ||
    status === 429 ||
    (typeof status === 'number' && status >= 500 && status <= 599) ||
    isNetworkError(error)
  );
}

function isNetworkError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const causeCode = String((error.cause as { code?: unknown } | undefined)?.code ?? '');
  return /fetch failed|network|socket|ECONN|ETIMEDOUT|EAI_AGAIN/i.test(`${error.message} ${causeCode}`);
}

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
