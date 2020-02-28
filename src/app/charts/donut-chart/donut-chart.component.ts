import { Component, Input, ViewEncapsulation } from '@angular/core';
import { ApexAxisChartSeries } from 'ng-apexcharts/lib/model/apex-types';
import cloneDeep from 'lodash.clonedeep';

import { DEFAULT_CONFIG } from './default-config';

@Component({
    selector: 'dsh-donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['donut-chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DonutChartComponent {
    @Input()
    series: ApexAxisChartSeries;

    @Input()
    labels: string[];

    @Input()
    colors?: string[];

    config = cloneDeep(DEFAULT_CONFIG);
}
