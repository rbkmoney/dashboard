import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { PieArcDatum } from 'd3-shape';
import { Selection } from 'd3-selection';

import { SegmentData } from '../models/chart-data-models';
import { DonutChartService } from './donut-chart.service';

@Component({
    selector: 'dsh-donut-chart',
    templateUrl: './donut-chart.component.html',
    styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnChanges, OnInit {
    @ViewChild('donutChart')
    private chartContainer: ElementRef;

    @Input()
    data: SegmentData[];

    private donut: Selection<any, PieArcDatum<SegmentData>, SVGGElement, {}>;

    constructor(private donutChartService: DonutChartService) {}

    ngOnInit() {
        const element = this.chartContainer.nativeElement;
        this.donut = this.donutChartService.createChart(this.data, element);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.donut) {
            this.donutChartService.updateChart(this.data);
        }
    }
}
