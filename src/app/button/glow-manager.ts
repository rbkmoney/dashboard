import { Renderer2 } from '@angular/core';

export class GlowManager {
    private glowEl: HTMLElement;

    constructor(private renderer: Renderer2) {}

    register(t: HTMLButtonElement) {
        this.glowEl = t.querySelector('.dsh-button-glow');
        this.renderer.listen(t, 'mouseenter', this.showGlow.bind(this));
        this.renderer.listen(t, 'mouseleave', this.hideGlow.bind(this));
        this.renderer.listen(t, 'mousemove', this.moveGlow.bind(this, t.offsetLeft, t.offsetTop));
    }

    private showGlow() {
        this.renderer.addClass(this.glowEl, 'show');
    }

    private hideGlow() {
        this.renderer.removeClass(this.glowEl, 'show');
    }

    private moveGlow(offsetLeft: number, offsetTop: number, event: MouseEvent) {
        const x = event.pageX - offsetLeft;
        const y = event.pageY - offsetTop;
        this.renderer.setStyle(this.glowEl, 'transform', `translate(${x}px, ${y}px)`);
    }
}
