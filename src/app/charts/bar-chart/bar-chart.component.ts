import { Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ApexAxisChartSeries } from 'ng-apexcharts/lib/model/apex-types';
import cloneDeep from 'lodash.clonedeep';
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
    series?: ApexAxisChartSeries;

    @Input()
    times: string[] | Moment[] | Date[];

    @Input()
    colors?: string[];

    @Input()
    height?: number;

    config = cloneDeep(DEFAULT_CONFIG);

    ngOnChanges(changes: SimpleChanges) {
        if (changes.times && changes.times.currentValue !== changes.times.previousValue) {
            this.config.xaxis.categories = this.times;
        }
        if (changes.height && changes.height.currentValue !== changes.height.previousValue) {
            this.config.chart.height = this.height;
        }
        console.log(!this.series[0].name);
        if (!this.series[0].name) {
            this.config.tooltip.enabled = false;
        }
        console.log(this.config);
    }
}
