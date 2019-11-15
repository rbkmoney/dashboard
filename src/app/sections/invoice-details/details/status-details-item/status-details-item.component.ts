import { Component, Input } from '@angular/core';

import { StatusColor as Color } from '../../../../theme-manager';

export interface StatusViewInfo {
    color: Color;
    text: string;
}

@Component({
    selector: 'dsh-details-status-item',
    templateUrl: './status-details-item.component.html'
})
export class StatusDetailsItemComponent {
    @Input() color: Color;

    @Input() text: string;
}
