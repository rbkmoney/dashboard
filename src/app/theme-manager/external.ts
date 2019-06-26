export abstract class External<T extends HTMLElement = HTMLElement> {
    element: T;

    constructor(public url: string) {}

    protected abstract createElement(): T;

    add(doc: Document) {
        if (!this.element) {
            this.element = this.createElement();
        }
        if (!doc.head.contains(this.element)) {
            doc.head.appendChild(this.element);
        }
    }

    remove(doc: Document) {
        if (doc.head.contains(this.element)) {
            doc.head.removeChild(this.element);
        }
    }
}

export class Style extends External<HTMLLinkElement> {
    protected createElement() {
        const styleElement = document.createElement('link');
        styleElement.href = this.url;
        styleElement.rel = 'stylesheet';
        return styleElement;
    }
}

export class Script extends External<HTMLScriptElement> {
    protected createElement() {
        const scriptElement = document.createElement('script');
        scriptElement.src = this.url;
        return scriptElement;
    }
}
