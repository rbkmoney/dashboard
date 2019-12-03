import { Component, Input } from '@angular/core';

import { StatusColor } from '../../theme-manager/color';

@Component({
    selector: 'dsh-timeline-item',
    templateUrl: 'timeline-item.component.html',
    styleUrls: ['timeline-item.component.scss']
})
export class TimelineItemComponent {
    @Input() color: StatusColor = StatusColor.success;
}
