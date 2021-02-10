import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dshExpandableRadioGroupItem]',
})
export class ExpandableRadioGroupItemDirective {
    @Input()
    dshExpandableRadioGroupItem: string | number;

    get template(): TemplateRef<ExpandableRadioGroupItemDirective> {
        return this.templateRef;
    }

    constructor(private templateRef: TemplateRef<ExpandableRadioGroupItemDirective>) {}
}
