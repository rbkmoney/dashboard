import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'dsh-expand-panel-content, [dsh-expand-panel-content]',
    template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class ExpandPanelContentComponent {
    @ViewChild(TemplateRef, { static: false }) templateRef: TemplateRef<{}>;
}
