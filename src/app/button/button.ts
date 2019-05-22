import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { CanColor, CanDisable } from '@angular/material/core';

const BUTTON_HOST_ATTRIBUTES = ['dsh-button', 'dsh-stroked-button'];

@Component({
    selector: `dsh-button, button[dsh-button], dsh-stroked-button, button[dsh-stroked-button]`,
    exportAs: 'dshButton',
    templateUrl: 'button.html',
    styleUrls: ['button.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DshButtonComponent implements CanDisable, CanColor, OnInit {
    @Input() disabled;
    @Input() color;

    private glow: HTMLElement;
    private button: HTMLButtonElement;

    constructor(elementRef: ElementRef, private renderer: Renderer2) {
        const button = elementRef.nativeElement as HTMLButtonElement;
        this.button = button;

        // For each of the variant selectors that is prevent in the button's host
        // attributes, add the correct corresponding class.
        for (const attr of BUTTON_HOST_ATTRIBUTES) {
            if (this.hasHostAttributes(attr)) {
                button.classList.add(attr);
            }
        }
    }

    ngOnInit(): void {
        this.renderer.listen(this.button, 'mouseenter', this.showGlow.bind(this));
        this.renderer.listen(this.button, 'mouseleave', this.hideGlow.bind(this));
        this.renderer.listen(this.button, 'mousemove', this.moveGlow.bind(this));
        this.renderer.listen(this.button, 'focusin', this.drawFocus.bind(this));
        this.renderer.listen(this.button, 'mousedown', this.drawFocus.bind(this));
        this.renderer.listen(this.button, 'focusout', this.hideFocus.bind(this));
        this.renderer.listen(this.button, 'mouseup', this.hideFocus.bind(this));
    }

    private drawFocus() {
        this.renderer.addClass(this.button, 'focused');
    }

    private hideFocus() {
        this.renderer.removeClass(this.button, 'focused');
    }

    private showGlow() {
        if (!this.glow) {
            this.glow = this.button.querySelector('.dsh-button-glow');
        }
        if (this.glowEnabled()) {
            this.renderer.addClass(this.glow, 'show');
        }
    }

    private hideGlow() {
        if (this.glowEnabled()) {
            this.renderer.removeClass(this.glow, 'show');
        }
    }

    private moveGlow(event: MouseEvent) {
        if (this.glowEnabled()) {
            const x = event.pageX - this.button.offsetLeft;
            const y = event.pageY - this.button.offsetTop;
            this.renderer.setStyle(this.glow, 'transform', `translate(${x}px, ${y}px)`);
        }
    }

    private glowEnabled() {
        return !this.button.classList.contains('dsh-stroked-button');
    }

    private hasHostAttributes(...attributes: string[]) {
        return attributes.some(attribute => this.button.hasAttribute(attribute));
    }
}
