import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[dshCreatedCase]',
})
export class CreatedCaseDirective {
    constructor(public templateRef: TemplateRef<unknown>) {}
}
