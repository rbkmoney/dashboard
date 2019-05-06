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
import { Selection } from 'd3-selection';

import { BarChartConfig, PeriodData } from '../models/chart-data-models';
import { BarChartService } from './bar-chart.service';

export type BarType = Selection<SVGGElement, {}, null, PeriodData>;

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

    constructor(private barChartService: BarChartService) {}

    ngOnInit() {
        const element = this.chartContainer.nativeElement;
        const config = new BarChartConfig(element.offsetWidth, element.offsetHeight);
        this.barChartService.initChart(this.data, element, config);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.barChartService.updateChart(this.data);
    }
}
