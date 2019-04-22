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
import { LinearChartService } from './linear-chart.service';
import { Selection } from 'd3-selection';

@Component({
    selector: 'dsh-linear-chart',
    templateUrl: './linear-chart.component.html',
    styleUrls: ['./linear-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [LinearChartService]
})
export class LinearChartComponent implements OnChanges, OnInit {
    @ViewChild('barChart')
    private chartContainer: ElementRef;

    @Input()
    data: PeriodData[];

    private svg: Selection<SVGGElement, {}, null, PeriodData>;
    private element;

    constructor(private linearChartService: LinearChartService) {}

    ngOnInit() {
        this.element = this.chartContainer.nativeElement;
        this.svg = this.linearChartService.initChart(this.svg, this.data, this.element);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.svg) {
            this.svg = this.linearChartService.updateChart(this.svg, this.data, this.element);
        }
    }
}
