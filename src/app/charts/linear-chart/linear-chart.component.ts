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

import { PreparedPeriodData } from '../models/chart-data-models';
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
    @ViewChild('linearChart')
    private chartContainer: ElementRef;

    @Input()
    data: PreparedPeriodData[];

    private svg: Selection<SVGGElement, {}, null, PreparedPeriodData>;
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
