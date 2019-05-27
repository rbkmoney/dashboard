import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input, OnChanges,
    OnInit,
    Renderer2, SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import {
    ThemePalette
} from '@angular/material/core';

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
export class DshButtonComponent implements OnInit, OnChanges {
    @HostBinding('attr.role') disabled;
    @Input() color: ThemePalette;

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

    ngOnChanges(changes: SimpleChanges) {
        const color = changes.color;
        if (color.previousValue !== color.currentValue) {
            this.setColor(color.currentValue);
            this.removeColor(color.previousValue);
        }
    }

    ngOnInit() {
        if (this.isGlowAllowed()) {
            new GlowManager(this.renderer).register(this.button);
        }
        new FocusManager(this.renderer).register(this.button);
    }

    private setColor(color: ThemePalette) {
        this.renderer.addClass(this.button, `dsh-${color}`)
    }

    private removeColor(color: ThemePalette) {
        this.renderer.removeClass(this.button, `dsh-${color}`)
    }

    private isGlowAllowed(): boolean {
        return !this.button.classList.contains('dsh-stroked-button');
    }

    private hasHostAttributes(...attributes: string[]): boolean {
        return attributes.some(attribute => this.button.hasAttribute(attribute));
    }
}
