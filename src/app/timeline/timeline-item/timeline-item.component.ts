import { Component, ContentChild, Input } from '@angular/core';

import {
    TimelineItemTitleComponent,
    TimelineItemBadgeComponent,
    TimelineItemContentComponent
} from './timeline-item-templates';
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
    @ContentChild(TimelineItemContentComponent) timelineItemContentComponent: TimelineItemContentComponent;
}
