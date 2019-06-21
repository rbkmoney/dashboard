import { Component, ContentChild, Input, HostBinding } from '@angular/core';

import { TimelineItemTitleComponent } from './timeline-item-title.component';
import { TimelineItemBadgeComponent } from './timeline-item-badge.component';
import { StatusColor } from '../../theme-manager/color';

@Component({
    selector: 'dsh-timeline-item',
    templateUrl: 'timeline-item.component.html',
    styleUrls: ['timeline-item.component.scss']
})
export class TimelineItemComponent {
    @Input() color: StatusColor;

    @ContentChild(TimelineItemTitleComponent) timelineItemTitleComponent: TimelineItemTitleComponent;
    @ContentChild(TimelineItemBadgeComponent) timelineItemBadgeComponent: TimelineItemBadgeComponent;
}
