export const toBaseUrl = (url: string, nesting = 3): string[] => url.split('/').splice(0, nesting);
