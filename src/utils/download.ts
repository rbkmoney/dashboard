/**
 * https://github.com/sindresorhus/multi-download/blob/master/index.js
 */
export async function download(url: string, name?: string) {
    const a = document.createElement('a');
    a.download = name;
    a.href = url;
    a.style.display = 'none';
    document.body.append(a);
    a.click();
    await new Promise(res => setTimeout(res, 100)); // Chrome requires the timeout
    a.remove();
}
