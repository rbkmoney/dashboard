import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-dl-item',
    templateUrl: 'list-item.component.html',
    styleUrls: ['list-item.component.scss']
})
export class ListItemComponent {
    @Input() title: string;
}
