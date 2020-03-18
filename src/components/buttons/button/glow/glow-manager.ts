import { Renderer2 } from '@angular/core';

export class GlowManager {
    private listeners: (() => void)[] = [];

    constructor(private renderer: Renderer2, private glowEl: HTMLElement) {}

    register(t: HTMLButtonElement) {
        this.unregister();
        this.listeners = [
            this.renderer.listen(t, 'mouseenter', this.showGlow.bind(this)),
            this.renderer.listen(t, 'mouseleave', this.hideGlow.bind(this)),
            this.renderer.listen(t, 'mousemove', this.moveGlow.bind(this, t))
        ];
    }

    unregister() {
        let unlisten: () => void;
        while ((unlisten = this.listeners.pop())) {
            unlisten();
        }
    }

    private showGlow() {
        this.renderer.addClass(this.glowEl, 'show');
    }

    private hideGlow() {
        this.renderer.removeClass(this.glowEl, 'show');
    }

    private moveGlow(t: HTMLElement, { clientX, clientY }: MouseEvent) {
        const { left, top } = t.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        this.renderer.setStyle(this.glowEl, 'transform', `translate(${x}px, ${y}px)`);
    }
}
