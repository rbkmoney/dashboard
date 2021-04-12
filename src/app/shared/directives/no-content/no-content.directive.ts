import {
    AfterContentChecked,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Input,
    TemplateRef,
    ViewContainerRef,
} from '@angular/core';

@Directive({
    selector: '[dshNoContent]',
})
export class NoContentDirective implements AfterContentChecked {
    @Input()
    dshNoContent: TemplateRef<any>;

    private get element(): HTMLElement {
        return this.elementRef.nativeElement;
    }
    private hasContent = true;

    constructor(private elementRef: ElementRef, private container: ViewContainerRef, private cdr: ChangeDetectorRef) {}

    ngAfterContentChecked(): void {
        let hasContent = false;
        for (let i = this.element.childNodes.length - 1; i >= 0; i -= 1) {
            const node = this.element.childNodes[i];
            if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
                hasContent = true;
                break;
            }
        }
        if (hasContent !== this.hasContent) {
            this.hasContent = hasContent;
            if (hasContent) {
                this.element.style.display = '';
                this.container.clear();
            } else {
                Promise.resolve().then(() => {
                    this.element.style.display = 'none';
                    this.container.createEmbeddedView(this.dshNoContent);
                    this.cdr.detectChanges();
                });
            }
        }
    }
}
