import { Component, Input } from '@angular/core';

import { StatusColor } from '../../../theme-manager';

@Component({
    selector: 'dsh-timeline-item-badge',
    templateUrl: 'timeline-item-badge.component.html',
    styleUrls: ['timeline-item-badge.component.scss']
})
export class TimelineItemBadgeComponent {
    @Input() color: StatusColor;
}
