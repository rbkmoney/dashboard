import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'dsh-list-item',
    templateUrl: 'list-item.component.html',
    styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
    @HostBinding('class.dsh-list-item-hidden') hidden = true;
}
