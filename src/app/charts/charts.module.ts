import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'd3-transition';

import { LayoutModule } from '../layout';
import { ChartsService } from './charts.service';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { BarChartService } from './bar-chart/bar-chart.service';
import { DonutChartService } from './donut-chart/donut-chart.service';

@NgModule({
    declarations: [DonutChartComponent, BarChartComponent, BarChartComponent],
    imports: [CommonModule, LayoutModule],
    exports: [DonutChartComponent, BarChartComponent, BarChartComponent],
    providers: [ChartsService, BarChartService, DonutChartService]
})
export class ChartsModule {}
