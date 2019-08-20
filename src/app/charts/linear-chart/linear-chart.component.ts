import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { LinearChartConfig, LinearPeriodData } from '../models/chart-data-models';
import { LinearChartService } from './linear-chart.service';
import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';

@Component({
    selector: 'dsh-linear-chart',
    templateUrl: './linear-chart.component.html',
    styleUrls: ['./linear-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [LinearChartService, LegendTooltipService]
})
export class LinearChartComponent implements OnChanges, OnInit {
    @ViewChild('linearChart', { static: true })
    private chartContainer: ElementRef;

    @Input()
    data: LinearPeriodData[];

    @Input()
    rawData: LinearPeriodData[];

    @Input()
    config: LinearChartConfig;

    constructor(private linearChartService: LinearChartService) {}

    ngOnInit() {
        const element = this.chartContainer.nativeElement;
        this.linearChartService.initChart(this.data, element, this.config);
    }

    ngOnChanges() {
        this.linearChartService.updateChart(this.data);
    }
}
