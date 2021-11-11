import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[dshExpandDetailsContent]',
})
export class ExpandDetailsContentDirective {
    constructor(public _template: TemplateRef<unknown>) {}
}
