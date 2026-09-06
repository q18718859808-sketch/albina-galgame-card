export interface PagehideLifecycleEvent extends Event {
  readonly persisted: boolean;
}

export function isPersistedPagehide(event?: Event): event is PagehideLifecycleEvent {
  return event?.type === 'pagehide' && 'persisted' in event && event.persisted === true;
}

export function resolveAlbinaLifecycleWindow(currentWindow: Window): Window {
  if (currentWindow.parent === currentWindow) return currentWindow;
  try {
    return currentWindow.parent.document?.body ? currentWindow.parent : currentWindow;
  } catch {
    return currentWindow;
  }
}
