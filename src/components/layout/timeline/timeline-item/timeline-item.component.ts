import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'dsh-timeline-item',
    template: '<ng-content></ng-content>',
    styleUrls: ['timeline-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TimelineItemComponent {
    @HostBinding('class.dsh-timeline-item') rootClass = true;
}
