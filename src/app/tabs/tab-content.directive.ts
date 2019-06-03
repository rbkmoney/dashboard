import {Directive, TemplateRef} from '@angular/core';

@Directive({selector: '[dshTabContent]'})
export class DshTabContentDirective {
    constructor(public template: TemplateRef<any>) { }
}
