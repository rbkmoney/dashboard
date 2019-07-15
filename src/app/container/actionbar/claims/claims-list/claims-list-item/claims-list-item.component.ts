import { Component, Input, Output, EventEmitter } from '@angular/core';

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

    @Output()
    action = new EventEmitter<{ isMoving: boolean; event: MouseEvent }>();

    clickHandler(event: MouseEvent) {
        this.action.emit({ isMoving: true, event });
    }
}
