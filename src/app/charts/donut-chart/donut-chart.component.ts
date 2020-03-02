import { Component, Input } from '@angular/core';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts/lib/model/apex-types';

import { DEFAULT_CONFIG } from './default-config';

@Component({
    selector: 'dsh-donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['donut-chart.component.scss']
})
export class DonutChartComponent {
    @Input()
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;

    @Input()
    labels: string[];

    @Input()
    colors?: string[];

    config = DEFAULT_CONFIG;
}
