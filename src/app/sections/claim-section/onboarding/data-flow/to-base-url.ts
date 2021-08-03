export const toBaseUrl = (url: string, nesting = 8): string[] => url.split('/').splice(0, nesting);
