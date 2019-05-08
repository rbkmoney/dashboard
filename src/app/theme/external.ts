export abstract class External<T extends HTMLElement = HTMLElement> {
    element: T;

    constructor(public url: string) {}

    protected abstract createElement(): T;

    add() {
        if (!this.element) {
            this.element = this.createElement();
        }
        if (!document.head.contains(this.element)) {
            document.head.appendChild(this.element);
        }
    }

    remove() {
        if (document.head.contains(this.element)) {
            document.head.removeChild(this.element);
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
