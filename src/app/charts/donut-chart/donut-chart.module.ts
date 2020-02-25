import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { DonutChartComponent } from './donut-chart.component';

@NgModule({
    declarations: [DonutChartComponent],
    exports: [DonutChartComponent],
    imports: [CommonModule, NgApexchartsModule]
})
export class DonutChartModule {}
