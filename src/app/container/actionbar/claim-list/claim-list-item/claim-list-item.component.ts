import { Component, Input } from '@angular/core';
import { Color } from '../../../../status';

@Component({
    selector: 'dsh-claim-list-item',
    templateUrl: 'claim-list-item.component.html'
})
export class ClaimListItemComponent {
    @Input()
    status: string;

    @Input()
    color: Color;

    clickHandler() {}
}
