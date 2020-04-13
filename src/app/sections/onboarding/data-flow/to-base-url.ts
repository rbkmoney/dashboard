export const toBaseUrl = (url: string, nesting = 7): string[] => url.split('/').splice(0, nesting);
