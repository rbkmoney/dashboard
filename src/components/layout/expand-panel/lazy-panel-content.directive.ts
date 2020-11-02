import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[dshLazyPanelContent]',
})
export class LazyPanelContentDirective {
    constructor(public _template: TemplateRef<any>) {}
}
