import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { formatDate } from '@angular/common';
import { ApexChart, ApexStates, ApexYAxis } from 'ng-apexcharts';
import {
    ApexAxisChartSeries,
    ApexDataLabels,
    ApexFill,
    ApexLegend,
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexStroke,
    ApexTooltip,
    ApexXAxis
} from 'ng-apexcharts/lib/model/apex-types';
import moment from 'moment';

import { BarChartService } from './bar-chart.service';

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
    colors = ['#81DBAF', '#979797', '#FC9B51', '#FB7777', '#FFCD00'];

    @Input()
    height = 300;

    chart: ApexChart;
    dataLabels: ApexDataLabels = {
        enabled: false
    };
    stroke: ApexStroke = {};
    legend: ApexLegend = {
        position: 'bottom',
        markers: {
            width: 12,
            height: 12,
            strokeWidth: 2,
            radius: 12,
            offsetX: 0,
            offsetY: 0
        },
        onItemHover: {
            highlightDataSeries: false
        }
    };
    fill: ApexFill = {
        opacity: 1
    };
    tooltip: ApexTooltip = {
        custom: ({ series, dataPointIndex, w }) => {
            let values = '';
            for (let i = 0; i < series.length; i++) {
                values += `
                    <div class="dsh-bar-chart-tooltip-container">
                        <div class="dsh-bar-chart-tooltip-round mat-caption" style="background-color: ${w.globals.colors[i]}"></div>
                        ${w.globals.seriesNames[i]} - ${series[i][dataPointIndex]}
                     </div>`;
            }
            return `
                <dsh-card>
                    <dsh-card-title>
                        <div class="dsh-bar-chart-tooltip-title mat-caption">${formatDate(
                            w.config.xaxis.categories[dataPointIndex],
                            'dd.MM.yyyy, EEEEEE',
                            moment.locale()
                        ).toLocaleUpperCase()}</div>
                    </dsh-card-title>
                    <dsh-card-content>
                        ${values}
                    </dsh-card-content>
                </dsh-card>
            `;
        }
    };
    plotOptions: ApexPlotOptions = {
        bar: {
            horizontal: false,
            columnWidth: '20'
        }
    };
    xaxis: ApexXAxis = {
        type: 'category',
        labels: {
            formatter(value: string): string {
                return formatDate(value, 'dd.MM', moment.locale());
            },
            offsetY: -5
        },
        categories: [
            moment().subtract(6, 'd'),
            moment().subtract(5, 'd'),
            moment().subtract(4, 'd'),
            moment().subtract(3, 'd'),
            moment().subtract(2, 'd'),
            moment().subtract(1, 'd')
        ],
        axisTicks: {
            show: false
        },
        axisBorder: {
            show: false
        },
        crosshairs: {
            show: false
        }
    };
    yaxis: ApexYAxis = {
        forceNiceScale: true
    };
    states: ApexStates = {
        hover: {
            filter: {
                type: 'none'
            }
        },
        active: {
            filter: {
                type: 'none'
            }
        }
    };

    ngOnInit() {
        this.chart = {
            type: 'bar',
            height: this.height,
            stacked: true,
            toolbar: {
                show: false
            }
        };
    }
}
