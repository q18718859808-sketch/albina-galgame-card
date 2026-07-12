export interface ThumbnailResult { blob: Blob; capturedMedia: boolean }

function canvasBlob(canvas: HTMLCanvasElement): Promise<Blob | undefined> {
  return new Promise((resolve) => {
    try { canvas.toBlob((blob) => resolve(blob ?? undefined), 'image/jpeg', 0.82); } catch { resolve(undefined); }
  });
}

async function fallbackThumbnail(): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = 480; canvas.height = 270;
  const context = canvas.getContext('2d');
  if (!context) return new Blob(['thumbnail unavailable'], { type: 'text/plain' });
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#050812'); gradient.addColorStop(1, '#3a2b13');
  context.fillStyle = gradient; context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#e2c46e'; context.font = '28px serif'; context.fillText('ALBINA', 28, 54);
  return await canvasBlob(canvas) ?? new Blob(['thumbnail unavailable'], { type: 'text/plain' });
}

export async function captureSceneThumbnail(root: ParentNode = document): Promise<ThumbnailResult> {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 270;
  const context = canvas.getContext('2d');
  if (!context) return { blob: new Blob(['thumbnail unavailable'], { type: 'text/plain' }), capturedMedia: false };
  const media = root.querySelector<HTMLVideoElement | HTMLImageElement>('.game-screen__video, .game-screen__cg, .game-screen__background');
  let capturedMedia = false;
  if (media) {
    try {
      context.drawImage(media, 0, 0, canvas.width, canvas.height);
      capturedMedia = true;
    } catch { capturedMedia = false; }
  }
  if (!capturedMedia) {
    const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#050812');
    gradient.addColorStop(1, '#3a2b13');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#e2c46e';
    context.font = '28px serif';
    context.fillText('ALBINA', 28, 54);
  }
  const blob = await canvasBlob(canvas);
  return { blob: blob ?? await fallbackThumbnail(), capturedMedia: Boolean(blob && capturedMedia) };
}
