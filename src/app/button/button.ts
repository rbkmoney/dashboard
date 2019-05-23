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

import { GlowManager } from './glow-manager';
import { FocusManager } from './focus-manager';

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

    ngOnInit() {
        if (this.isGlowAllowed()) {
            new GlowManager(this.renderer).register(this.button);
        }
        new FocusManager(this.renderer).register(this.button);
    }

    private isGlowAllowed(): boolean {
        return !this.button.classList.contains('dsh-stroked-button');
    }

    private hasHostAttributes(...attributes: string[]): boolean {
        return attributes.some(attribute => this.button.hasAttribute(attribute));
    }
}
