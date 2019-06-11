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
import { LegendTooltipService } from '../legend-tooltip/legend-tooltip.service';

export type BarType = Selection<SVGGElement, {}, null, PeriodData>;

@Component({
    selector: 'dsh-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss', '../legend-tooltip/_legend-tooltip-theme.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [BarChartService, LegendTooltipService]
})
export class BarChartComponent implements OnChanges, OnInit {
    @ViewChild('barChart')
    private chartContainer: ElementRef;

    @Input()
    data: PeriodData[];

    @Input()
    config: BarChartConfig;

    constructor(private barChartService: BarChartService) {}

    ngOnInit() {
        const element = this.chartContainer.nativeElement;
        this.barChartService.initChart(this.data, element, this.config);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.barChartService.updateChart(this.data);
    }
}
