import { Component, Input } from '@angular/core';

@Component({
    selector: 'dsh-laptop-grid',
    templateUrl: './laptop-grid.component.html',
    styleUrls: ['./laptop-grid.component.scss'],
})
export class LaptopGridComponent {
    @Input() brandType;
}
