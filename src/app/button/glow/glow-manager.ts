import { Renderer2 } from '@angular/core';

export class GlowManager {
    constructor(private renderer: Renderer2, private glowEl: HTMLElement) {}

    register(t: HTMLButtonElement) {
        this.renderer.listen(t, 'mouseenter', this.showGlow.bind(this));
        this.renderer.listen(t, 'mouseleave', this.hideGlow.bind(this));
        this.renderer.listen(t, 'mousemove', this.moveGlow.bind(this, t));
    }

    private showGlow() {
        this.renderer.addClass(this.glowEl, 'show');
    }

    private hideGlow() {
        this.renderer.removeClass(this.glowEl, 'show');
    }

    private moveGlow(t: HTMLElement, event: MouseEvent) {
        const x = event.pageX - t.offsetLeft;
        const y = event.pageY - t.offsetTop;
        this.renderer.setStyle(this.glowEl, 'transform', `translate(${x}px, ${y}px)`);
    }
}
