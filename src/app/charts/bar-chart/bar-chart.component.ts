import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ApexAxisChartSeries, ApexNonAxisChartSeries } from 'ng-apexcharts/lib/model/apex-types';
import { Moment } from 'moment';

import { BarChartService } from './bar-chart.service';
import { defaultConfig } from './default-config';

@Component({
    selector: 'dsh-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['bar-chart.component.scss'],
    providers: [BarChartService],
    encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {
    @Input()
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;

    @Input()
    times: string[] | Moment[] | Date[];

    @Input()
    colors: string[];

    @Input()
    height = 300;

    chart = defaultConfig.chart;
    dataLabels = defaultConfig.dataLabels;
    legend = defaultConfig.legend;
    fill = defaultConfig.fill;
    tooltip = defaultConfig.tooltip;
    plotOptions = defaultConfig.plotOptions;
    xaxis = defaultConfig.xaxis;
    yaxis = defaultConfig.yaxis;
    states = defaultConfig.states;

    initialized = false;

    ngOnInit() {
        this.chart.height = this.height;
        this.xaxis.categories = this.times;
        this.initialized = true;
    }
}
