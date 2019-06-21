import { Component, ViewChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'dsh-timeline-item-badge, [dsh-timeline-item-badge]',
    template: '<ng-template><ng-content></ng-content></ng-template>'
})
export class TimelineItemBadgeComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<{}>;
}
