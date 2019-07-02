import { Component, Input } from '@angular/core';

import { Color } from '../../../../status';

@Component({
    selector: 'dsh-status-item',
    templateUrl: './status-item.component.html'
})
export class StatusItemComponent {
    @Input() color: Color;

    @Input() text: string;
}
