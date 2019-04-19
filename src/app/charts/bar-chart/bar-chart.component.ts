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
        const element = this.chartContainer.nativeElement;
        this.svg = this.barChartService.initChart(this.data, element);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.svg) {
            this.barChartService.updateChart(this.data);
        }
    }
}
