import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

import { StatusColor } from '../../../../../app/theme-manager';

@Component({
    selector: 'dsh-timeline-item-badge',
    template: '<ng-content></ng-content>',
    styleUrls: ['timeline-item-badge.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class TimelineItemBadgeComponent {
    @Input() color: StatusColor;

    @HostBinding('class.dsh-timeline-item-badge') rootClass = true;

    @HostBinding('class.dsh-timeline-item-badge-success') get success() {
        return this.color === StatusColor.Success;
    }

    @HostBinding('class.dsh-timeline-item-badge-warn') get warn() {
        return this.color === StatusColor.Warn;
    }

    @HostBinding('class.dsh-timeline-item-badge-pending') get pending() {
        return this.color === StatusColor.Pending;
    }
}
