import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'dsh-limited-list-item',
    templateUrl: 'limited-list-item.component.html',
    styleUrls: ['./limited-list-item.component.scss'],
})
export class LimitedListItemComponent {
    @HostBinding('class.dsh-limited-list-item-hidden') hidden = true;
}
