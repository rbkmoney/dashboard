import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'd3-transition';

import { LayoutModule } from '../layout';
import { ChartsService } from './charts.service';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DonutChartService } from './donut-chart/donut-chart.service';
import { BarChartService } from './bar-chart/bar-chart.service';

@NgModule({
    declarations: [DonutChartComponent, BarChartComponent],
    imports: [CommonModule, LayoutModule],
    exports: [DonutChartComponent, BarChartComponent],
    providers: [ChartsService, DonutChartService, BarChartService]
})
export class ChartsModule {}
