import { Component, Input } from '@angular/core';

import { Color } from '../../../status';

export interface StatusViewInfo {
    color: Color;
    text: string;
}

@Component({
    selector: 'dsh-detail-status-item',
    templateUrl: './status-detail-item.component.html'
})
export class StatusDetailItemComponent {
    @Input() info: StatusViewInfo;
}
