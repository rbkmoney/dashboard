import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dshNewCase]',
})
export class NewCaseDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}
