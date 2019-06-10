import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
    selector: '[dshTabLabelWrapper]'
})
export class DshTabLabelWrapperDirective {
    @Input() disabled: boolean;

    @HostBinding('class.dsh-tab-disabled')
    dshTabDisabled = this.disabled;

    @HostBinding('attr.aria-disabled')
    ariaDisabled = !!this.disabled;

    constructor(public elementRef: ElementRef) {}

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
