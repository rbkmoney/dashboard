import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'd3-transition';

import { LayoutModule } from '../layout';
import { ChartsService } from './charts.service';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DonutChartService } from './donut-chart/donut-chart.service';
import { LinearChartComponent } from './linear-chart/linear-chart.component';
import { LegendTooltipService } from './legend-tooltip/legend-tooltip.service';

@NgModule({
    declarations: [DonutChartComponent, BarChartComponent, LinearChartComponent],
    imports: [CommonModule, LayoutModule],
    exports: [DonutChartComponent, BarChartComponent, LinearChartComponent],
    providers: [ChartsService, DonutChartService, LegendTooltipService]
})
export class ChartsModule {}
