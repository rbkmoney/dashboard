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
import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';

@Component({
    selector: 'dsh-linear-chart',
    templateUrl: './linear-chart.component.html',
    styleUrls: ['./linear-chart.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [LinearChartService, LegendTooltipService]
})
export class LinearChartComponent implements OnChanges, OnInit {
    @ViewChild('linearChart')
    private chartContainer: ElementRef;

    @Input()
    data: PreparedPeriodData[];

    @Input()
    rawData: PreparedPeriodData[];

    constructor(private linearChartService: LinearChartService) {}

    ngOnInit() {
        const element = this.chartContainer.nativeElement;
        this.linearChartService.initChart(this.data, element);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.linearChartService.updateChart(this.data);
    }
}
