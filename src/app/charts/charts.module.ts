import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../layout';
import { ChartsService } from './charts.service';
import { DonutChartComponent } from './donut-chart/donut-chart.component';

@NgModule({
    declarations: [DonutChartComponent],
    imports: [CommonModule, LayoutModule],
    exports: [DonutChartComponent],
    providers: [ChartsService]
})
export class ChartsModule {}
