import { download } from './download';

export function downloadAll(urls: (string | { name?: string; url: string })[]) {
    for (const url of urls) {
        typeof url === 'string' ? download(url) : download(url.url, url.name);
    }
}
