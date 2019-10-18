export function download(url: string, name?: string) {
    const a = document.createElement('a');
    if (name) {
        a.download = name;
    }
    a.href = url;
    a.style.display = 'none';
    document.body.append(a);
    a.click();
    a.remove();
}
