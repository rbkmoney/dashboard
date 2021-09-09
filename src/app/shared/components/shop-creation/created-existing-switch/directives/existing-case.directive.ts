import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dshExistingCase]',
})
export class ExistingCaseDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}
