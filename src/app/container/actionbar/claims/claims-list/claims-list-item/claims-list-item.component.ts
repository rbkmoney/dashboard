import { Component, Input } from '@angular/core';

import { StatusColor } from '../../../../../theme-manager';

@Component({
    selector: 'dsh-claims-list-item',
    templateUrl: 'claims-list-item.component.html',
    styleUrls: ['claims-list-item.component.scss']
})
export class ClaimsListItemComponent {
    @Input()
    status: string;

    @Input()
    color: StatusColor;

    @Input()
    id: number;

    clickHandler() {}
}
