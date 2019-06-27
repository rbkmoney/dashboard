import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-detail-item',
    templateUrl: './detail-item.component.html',
    styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent {
    @Input() title: string;
}
