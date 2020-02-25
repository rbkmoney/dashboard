import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts/lib/model/apex-types';
import { Moment } from 'moment';

import { DEFAULT_CONFIG } from './default-config';

@Component({
    selector: 'dsh-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['bar-chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnChanges {
    @Input()
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;

    @Input()
    times: string[] | Moment[] | Date[];

    @Input()
    colors?: string[];

    @Input()
    height?: number;

    config = DEFAULT_CONFIG;

    ngOnChanges(changes: SimpleChanges) {
        if (changes.times && changes.times.currentValue !== changes.times.previousValue) {
            this.config.xaxis = { ...this.config.xaxis, categories: this.times };
        }
        if (changes.height && changes.height.currentValue !== changes.height.previousValue) {
            this.config.chart = { ...this.config.chart, height: this.height };
        }
    }
}
