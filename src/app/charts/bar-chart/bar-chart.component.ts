import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import { PeriodData } from '../models/chart-data-models';
import { BarChartService } from './bar-chart.service';
import { Selection } from 'd3-selection';
import { element } from 'protractor';

@Component({
    selector: 'dsh-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [BarChartService]
})
export class BarChartComponent implements OnChanges, OnInit {
    @ViewChild('barChart')
    private chartContainer: ElementRef;

    @Input()
    data: PeriodData[];

    private svg: Selection<SVGGElement, {}, null, PeriodData>;
    private element;

    constructor(private barChartService: BarChartService) {}

    ngOnInit() {
        this.element = this.chartContainer.nativeElement;
        this.svg = this.barChartService.initChart(this.svg, this.data, element);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.svg) {
            this.svg = this.barChartService.updateChart(this.svg, this.data, this.element);
        }
    }
}
