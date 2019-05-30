import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'dsh-float-panel-actions',
    template: `
        <ng-template><ng-content></ng-content></ng-template>
    `
})
export class FloatPanelActionsComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;
}
