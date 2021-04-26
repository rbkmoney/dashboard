import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { CanDisableCtor, mixinDisabled } from '@angular/material/core';

import { coerceBoolean } from '@dsh/utils';

import { ColorManager } from './color-manager';
import { FocusManager } from './focus-manager';

const BUTTON_HOST_ATTRIBUTES = ['dsh-button', 'dsh-stroked-button', 'dsh-icon-button'];

// Boilerplate for applying mixins to MatButton.
class MatButtonBase {
    constructor(public _elementRef: ElementRef) {}
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const _MatButtonMixinBase: CanDisableCtor & typeof MatButtonBase = mixinDisabled(MatButtonBase);

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[dsh-button], button[dsh-stroked-button], button[dsh-icon-button]',
    exportAs: 'dshButton',
    templateUrl: 'button.component.html',
    styleUrls: ['button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends _MatButtonMixinBase implements OnChanges {
    @Input()
    color;

    @Input()
    @coerceBoolean
    disabled = false;

    @Input()
    size: 'lg' | 'md' = 'md';

    @HostBinding('attr.disabled')
    get attrDisabled() {
        return this.disabled ? 'disabled' : null;
    }

    @HostBinding('class.dsh-size-lg')
    get sizeLg() {
        return this.size === 'lg';
    }

    button: HTMLButtonElement;
    private colorManager: ColorManager;

    constructor(elementRef: ElementRef, private renderer: Renderer2) {
        super(elementRef);
        const button = elementRef.nativeElement as HTMLButtonElement;
        this.button = button;

        // For each of the variant selectors that is prevent in the button's host
        // attributes, add the correct corresponding class.
        for (const attr of BUTTON_HOST_ATTRIBUTES) {
            if (this.hasHostAttributes(attr)) {
                renderer.addClass(button, attr);
            }
        }
        this.colorManager = new ColorManager(renderer, button);
        new FocusManager(this.renderer).register(this.button);
    }

    ngOnChanges({ color }: SimpleChanges) {
        if (color && color.previousValue !== color.currentValue) {
            this.colorManager.set(color.currentValue);
            this.colorManager.remove(color.previousValue);
        }
    }

    private hasHostAttributes(...attributes: string[]): boolean {
        return attributes.some((attribute) => this.button.hasAttribute(attribute));
    }
}
