import { Component, ViewChild, TemplateRef } from '@angular/core';

const template = '<ng-template><ng-content></ng-content></ng-template>';

@Component({
    selector: 'dsh-timeline-item-badge, [dsh-timeline-item-badge]',
    template
})
export class TimelineItemBadgeComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<{}>;
}

@Component({
    selector: 'dsh-timeline-item-title, [dsh-timeline-item-title]',
    template
})
export class TimelineItemTitleComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<{}>;
}

@Component({
    selector: 'dsh-timeline-item-content, [dsh-timeline-item-content]',
    template
})
export class TimelineItemContentComponent {
    @ViewChild(TemplateRef) templateRef: TemplateRef<{}>;
}
