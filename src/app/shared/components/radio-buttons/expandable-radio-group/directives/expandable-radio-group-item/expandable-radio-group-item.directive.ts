import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dshExpandableRadioGroupItem]',
})
export class ExpandableRadioGroupItemDirective {
    @Input()
    dshExpandableRadioGroupItem: string | number;

    constructor(public readonly templateRef: TemplateRef<any>) {}
}
