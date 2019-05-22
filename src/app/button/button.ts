import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';
import { CanColor, CanDisable } from '@angular/material/core';

const BUTTON_HOST_ATTRIBUTES = [
    'dsh-button',
    'dsh-stroked-button'
];

@Component({
    selector: `dsh-button, button[dsh-button], dsh-stroked-button, button[dsh-stroked-button]`,
    exportAs: 'dshButton',
    templateUrl: 'button.html',
    styleUrls: ['button.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DshButtonComponent implements CanDisable, CanColor {
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

        button.addEventListener('mouseenter', this.showGlow.bind(this));
        button.addEventListener('mouseleave', this.hideGlow.bind(this));
        button.addEventListener('mousemove', this.moveGlow.bind(this));
    }

    private showGlow() {
        if (!this.glow) {
            this.glow = this.button.querySelector('.dsh-button-glow');
        }
        if (!this.button.classList.contains('dsh-stroked-button')) {
            this.renderer.addClass(this.glow, 'show')
        }
    }

    private hideGlow() {
        this.renderer.removeClass(this.glow, 'show');
    }

    private moveGlow(event: MouseEvent) {
        const x = event.pageX - this.button.offsetLeft;
        const y = event.pageY - this.button.offsetTop;
        this.renderer.setStyle(this.glow, 'transform', `translate(${x}px, ${y}px)`);
    }

    private hasHostAttributes(...attributes: string[]) {
        return attributes.some(attribute => this.button.hasAttribute(attribute));
    }
}
