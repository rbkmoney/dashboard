import { Component } from '@angular/core';
import { ApexChart } from 'ng-apexcharts';
import {
    ApexAxisChartSeries,
    ApexDataLabels,
    ApexFill,
    ApexLegend,
    ApexNoData,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexStroke,
    ApexTooltip,
    ApexXAxis,
    ApexYAxis
} from 'ng-apexcharts/lib/model/apex-types';

import { BarChartService } from './bar-chart.service';

@Component({
    selector: 'dsh-bar-chart',
    templateUrl: './bar-chart.component.html',
    providers: [BarChartService]
})
export class BarChartComponent {

    chart: ApexChart = {
        type: 'bar',
        height: 300,
        stacked: true
    };
    dataLabels: ApexDataLabels = {};
    series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
        {
            name: "PRODUCT A",
            data: [44, 55, 41, 67, 22, 43]
        },
        {
            name: "PRODUCT B",
            data: [13, 23, 20, 8, 13, 27]
        },
        {
            name: "PRODUCT C",
            data: [11, 17, 15, 15, 21, 14]
        },
        {
            name: "PRODUCT D",
            data: [21, 7, 25, 13, 22, 8]
        }
    ];
    stroke: ApexStroke = {};
    labels: string[];
    legend: ApexLegend = {};
    noData: ApexNoData = {};
    fill: ApexFill = {};
    tooltip: ApexTooltip = {};
    plotOptions: ApexPlotOptions = {
        bar: {
            horizontal: false,
            columnWidth: '20'
        }
    };
    xaxis: ApexXAxis = {
        type: "category",
        categories: ["01.01", "02.01", "03.01", "04.01", "05.01", "06.01"],
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        }
    };
    yaxis: ApexYAxis | ApexYAxis[] = {

    };

}
