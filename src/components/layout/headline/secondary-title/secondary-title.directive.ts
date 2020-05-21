import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[dshSecondaryTitle]',
})
export class SecondaryTitleDirective {
    constructor(el: ElementRef, private renderer: Renderer2) {
        this.renderer.addClass(el.nativeElement, 'secondary-title');
    }
}
