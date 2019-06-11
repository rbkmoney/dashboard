import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'dsh-float-panel-more',
    template: `
        <ng-template><ng-content></ng-content></ng-template>
    `
})
export class FloatPanelMoreTemplateComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<{}>;
}
