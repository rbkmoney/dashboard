import { Renderer2 } from '@angular/core';

export class FocusManager {
    constructor(private renderer: Renderer2) {}

    register(t: HTMLButtonElement) {
        this.renderer.listen(t, 'focusin', this.drawFocus.bind(this, t));
        this.renderer.listen(t, 'mousedown', this.drawFocus.bind(this, t));
        this.renderer.listen(t, 'focusout', this.hideFocus.bind(this, t));
        this.renderer.listen(t, 'mouseup', this.hideFocus.bind(this, t));
        this.renderer.listen(t, 'mouseleave', this.hideFocus.bind(this, t));
    }

    private drawFocus(el: HTMLButtonElement) {
        this.renderer.addClass(el, 'focused');
    }

    private hideFocus(el: HTMLButtonElement) {
        this.renderer.removeClass(el, 'focused');
    }
}
