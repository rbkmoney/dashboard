import { Component, ChangeDetectionStrategy, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
    selector: 'dsh-timeline-item-title',
    template: '<ng-content></ng-content>',
    styleUrls: ['timeline-item-title.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineItemTitleComponent {
    @HostBinding('class.dsh-timeline-item-title') rootClass = true;
}
