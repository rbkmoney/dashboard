import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'dsh-expand-panel-more',
    template: `
        <ng-template><ng-content></ng-content></ng-template>
    `
})
export class ExpandPanelMoreTemplateComponent {
    @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<{}>;
}
