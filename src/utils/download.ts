/**
 * https://github.com/sindresorhus/multi-download/blob/master/index.js
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export async function download(url: string, name?: string) {
    console.log('THIS IS DOWNLOAD URL EEEEEEEEEEEE', url);
    const a = document.createElement('a');
    a.id = url;
    a.download = name;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.href = url;
    a.click();
    // Chrome requires the timeout
    await delay(100);
    a.remove();
}

export function multipleDownload(urls: string[]) {
    urls.forEach(async (url, i) => {
        await delay(i * 1000);
        download(url);
    });
}
