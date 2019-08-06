import { Component, Input } from '@angular/core';

import { StatusColor } from '../../../theme-manager';

export interface StatusViewInfo {
    color: StatusColor;
    text: string;
}

@Component({
    selector: 'dsh-details-status-item',
    templateUrl: './status-details-item.component.html'
})
export class StatusDetailsItemComponent {
    @Input() info: StatusViewInfo;
}
