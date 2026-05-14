/**
 * Turns common sharing URLs into something usable as an image `src`.
 * Google Drive "/file/d/…/view" links are HTML pages — they must be converted to a direct file URL.
 */
export function normalizeImageSrcUrl(raw: string): string {
  const url = raw.trim();
  if (!url) return url;

  const fileIdMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (fileIdMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
  }

  const openMatch = url.match(/drive\.google\.com\/open\?[^#]*id=([^&]+)/i);
  if (openMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  }

  return url;
}
