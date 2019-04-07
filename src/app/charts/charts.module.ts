import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import 'd3-transition';

import { LayoutModule } from '../layout';
import { ChartsService } from './charts.service';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
    declarations: [DonutChartComponent, BarChartComponent],
    imports: [CommonModule, LayoutModule],
    exports: [DonutChartComponent, BarChartComponent],
    providers: [ChartsService]
})
export class ChartsModule {}
