import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'dsh-float-panel-more',
    templateUrl: 'float-panel-more.component.html',
    styleUrls: ['float-panel-more.component.scss']
})
export class FloatPanelMoreComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

    close() {}

    pin() {}
}
