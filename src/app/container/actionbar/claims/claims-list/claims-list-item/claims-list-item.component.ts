import { Component, Input } from '@angular/core';

import { Color } from '../../../../../status';

@Component({
    selector: 'dsh-claims-list-item',
    templateUrl: 'claims-list-item.component.html',
    styleUrls: ['claims-list-item.component.scss']
})
export class ClaimsListItemComponent {
    @Input()
    status: string;

    @Input()
    color: Color;

    clickHandler() {}
}
