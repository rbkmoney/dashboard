import { Component, Input } from '@angular/core';

import { LegendItem } from '../models/chart-data-models';

@Component({
    selector: 'dsh-legend',
    templateUrl: './legend.component.html',
    styleUrls: ['./legend.component.scss']
})
export class LegendComponent {
    @Input()
    items: LegendItem[] = [];
}
