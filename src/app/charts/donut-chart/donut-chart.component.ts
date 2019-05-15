import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import { DonutChartConfig, SegmentData } from '../models/chart-data-models';
import { DonutChartService } from './donut-chart.service';
import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';

@Component({
    selector: 'dsh-donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['./donut-chart.component.scss', '../legend-tooltip/_legend-tooltip-theme.scss'],
    providers: [DonutChartService, LegendTooltipService]
})
export class DonutChartComponent implements OnChanges, OnInit {
    @ViewChild('donutChart')
    private chartContainer: ElementRef;

    @Input()
    data: SegmentData[];

    constructor(private donutChartService: DonutChartService) {}

    ngOnInit() {
        const element = this.chartContainer.nativeElement;
        const config = new DonutChartConfig(element.offsetWidth / 2);
        this.donutChartService.initChart(this.data, element, config);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.donutChartService.updateChart(this.data);
    }
}
