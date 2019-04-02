import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { LayoutModule } from '../layout';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
    declarations: [DonutChartComponent, BarChartComponent],
    imports: [CommonModule, LayoutModule],
    exports: [DonutChartComponent, BarChartComponent]
})
export class ChartsModule {}
