// This module handles interactions with the Remove.bg API

export async function removeBackground(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('image_file', file);
  formData.append('size', 'auto');

  const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;

  try {
    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.errors?.[0]?.title || `Error: ${response.status} ${response.statusText}`);
    }

    // Get the image data as blob
    const imageBlob = await response.blob();
    return URL.createObjectURL(imageBlob);
  } catch (error) {
    console.error('Remove.bg API error:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to remove background: ${error.message}`);
    }
    throw new Error('An unknown error occurred while processing the image');
  }
}

export function downloadProcessedImage(imageUrl: string, fileName: string): void {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = fileName.replace(/\.[^/.]+$/, '') + '_nobg.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}