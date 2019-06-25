import { Component, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
    selector: 'dsh-timeline-item-content, [dsh-timeline-item-content]',
    template: '<ng-content></ng-content>',
    styleUrls: ['timeline-item-content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TimelineItemContentComponent {
    @HostBinding('class.dsh-timeline-item-content') rootClass = true;
}
