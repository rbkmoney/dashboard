export function createScriptElement(url: string): HTMLScriptElement {
    const scriptElement = document.createElement('script');
    scriptElement.src = url;
    return scriptElement;
}
