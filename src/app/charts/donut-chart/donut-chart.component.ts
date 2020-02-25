import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts/lib/model/apex-types';

import { DEFAULT_CONFIG } from './default-config';

@Component({
    selector: 'dsh-donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['donut-chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DonutChartComponent implements OnChanges {

    @Input()
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;

    @Input()
    labels: string[];

    @Input()
    colors?: string[];

    @Input()
    height?: number;

    config = DEFAULT_CONFIG;

    ngOnChanges(changes: SimpleChanges) {
        console.log(this.height);
        if (changes.height.currentValue !== changes.height.previousValue) {
            this.config.chart = { ...this.config.chart, height: this.height };
        }
    }

}
