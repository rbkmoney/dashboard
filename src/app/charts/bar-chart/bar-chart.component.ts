import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { formatDate } from '@angular/common';
import { select } from 'd3-selection';
import { easeExp } from 'd3-ease';
import { scaleBand, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { max } from 'd3-array';
import { locale } from 'moment';

import { PeriodData } from '../models/chart-data-models';
import { chartColors } from '../color-constants';
import { BarChartService } from './bar-chart.service';

@Component({
    selector: 'dsh-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnChanges, OnInit {
    @ViewChild('barChart')
    private chartContainer: ElementRef;

    @Input()
    data: PeriodData[];

    private svg: any;


    constructor(private barChartService: BarChartService) {}

    ngOnInit() {
        this.initChart();
    }

    ngOnChanges(changes: any) {
        if (this.svg) {
            this.updateChart();
        }
    }

}
