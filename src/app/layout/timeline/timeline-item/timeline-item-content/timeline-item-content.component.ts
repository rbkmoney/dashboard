import { Component, ViewEncapsulation, HostBinding, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'dsh-timeline-item-content, [dsh-timeline-item-content]',
    template: '<ng-content></ng-content>',
    styleUrls: ['timeline-item-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TimelineItemContentComponent {
    @HostBinding('class.dsh-timeline-item-content') rootClass = true;
}
