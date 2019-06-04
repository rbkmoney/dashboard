import { Directive, ElementRef } from '@angular/core';
import { CanDisable, CanDisableCtor, mixinDisabled } from '@angular/material/core';

class DshTabLabelWrapperBase {}

const _DshTabLabelWrapperMixinBase: CanDisableCtor & typeof DshTabLabelWrapperBase =
    mixinDisabled(DshTabLabelWrapperBase);

@Directive({
    selector: '[dshTabLabelWrapper]'
    // inputs: ['disabled'],
    // host: {
    //   '[class.mat-tab-disabled]': 'disabled',
    //   '[attr.aria-disabled]': '!!disabled',
    // }
})
export class DshTabLabelWrapperDirective extends _DshTabLabelWrapperMixinBase implements CanDisable {
    constructor(public elementRef: ElementRef) {
        super();
    }

    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    getOffsetLeft(): number {
        return this.elementRef.nativeElement.offsetLeft;
    }

    getOffsetWidth(): number {
        return this.elementRef.nativeElement.offsetWidth;
    }
}
