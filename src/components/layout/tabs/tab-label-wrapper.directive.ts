import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[dshTabLabelWrapper]',
})
export class DshTabLabelWrapperDirective {
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
