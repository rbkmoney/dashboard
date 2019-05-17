import { Component, Input, OnInit } from '@angular/core';
import { LegendItem } from '../models/chart-data-models';

@Component({
    selector: 'dsh-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
    @Input()
    items: LegendItem[] = [];

    private flexDirection: string;

    ngOnInit() {
        if (this.items.length > 0) {
            this.flexDirection = this.items[0].value ? 'column' : 'row';
        }
    }
}
