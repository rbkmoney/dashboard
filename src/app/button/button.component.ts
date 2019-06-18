import {
    Component,
    ElementRef,
    OnChanges,
    Renderer2,
    SimpleChanges,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    HostBinding
} from '@angular/core';
import { mixinDisabled, CanDisableCtor } from '@angular/material/core';
import { Platform } from '@angular/cdk/platform';

import { FocusManager } from './focus-manager';
import { ColorManager } from './color-manager';
import { coerceBoolean } from '../../utils';

const BUTTON_HOST_ATTRIBUTES = ['dsh-button', 'dsh-stroked-button', 'dsh-icon-button', 'dsh-fab-button'];

// Boilerplate for applying mixins to MatButton.
class MatButtonBase {
    constructor(public _elementRef: ElementRef) {}
}

const _MatButtonMixinBase: CanDisableCtor & typeof MatButtonBase = mixinDisabled(MatButtonBase);

@Component({
    selector: 'button[dsh-button], button[dsh-stroked-button], button[dsh-icon-button], button[dsh-fab-button]',
    exportAs: 'dshButton',
    templateUrl: 'button.component.html',
    styleUrls: ['button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends _MatButtonMixinBase implements OnChanges {
    @Input()
    color;

    @Input()
    @coerceBoolean
    disabled = false;

    @HostBinding('attr.disabled')
    get attrDisabled() {
        return this.disabled ? 'disabled' : null;
    }

    glowAllowed = false;

    private button: HTMLButtonElement;
    private colorManager: ColorManager;

    constructor(elementRef: ElementRef, private renderer: Renderer2, private platform: Platform) {
        super(elementRef);
        const button = elementRef.nativeElement as HTMLButtonElement;
        this.button = button;

        // For each of the variant selectors that is prevent in the button's host
        // attributes, add the correct corresponding class.
        for (const attr of BUTTON_HOST_ATTRIBUTES) {
            if (this.hasHostAttributes(attr)) {
                button.classList.add(attr);
            }
        }
        this.colorManager = new ColorManager(renderer, button);
        new FocusManager(this.renderer).register(this.button);
        this.glowAllowed = this.initGlowAvailability();
    }

    ngOnChanges({ color, disabled }: SimpleChanges) {
        if (color && color.previousValue !== color.currentValue) {
            this.colorManager.set(color.currentValue);
            this.colorManager.remove(color.previousValue);
        }
        if (disabled && typeof disabled.currentValue === 'boolean') {
            this.glowAllowed = !disabled.currentValue;
        }
    }

    private initGlowAvailability(): boolean {
        return (
            !this.platform.ANDROID &&
            !this.platform.IOS &&
            !this.isStrokedButton() &&
            !this.isIconButton() &&
            !this.button.disabled
        );
    }

    private isStrokedButton(): boolean {
        return this.button.classList.contains('dsh-stroked-button');
    }

    private isIconButton(): boolean {
        return this.button.classList.contains('dsh-icon-button');
    }

    private hasHostAttributes(...attributes: string[]): boolean {
        return attributes.some(attribute => this.button.hasAttribute(attribute));
    }
}
