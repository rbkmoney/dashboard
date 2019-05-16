import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { LegendItem } from '../models/chart-data-models';


@Component({
    selector: 'dsh-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LegendComponent implements OnInit {

    @Input()
    items: LegendItem[];

    ngOnInit() {
        if (!this.items) {
            this.items = [];
        }
    }

}
