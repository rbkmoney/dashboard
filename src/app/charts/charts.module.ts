import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { LayoutModule } from '../layout';

@NgModule({
    declarations: [DonutChartComponent],
    imports: [CommonModule, LayoutModule],
    exports: [DonutChartComponent]
})
export class ChartsModule {}
