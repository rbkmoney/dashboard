import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'dsh-timeline-item-title, [dsh-timeline-item-title]',
    template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class TimelineItemTitleComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<{}>;
}
