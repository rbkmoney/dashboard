import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { BarChartComponent } from './bar-chart.component';

@NgModule({
    declarations: [BarChartComponent],
    exports: [BarChartComponent],
    imports: [NgApexchartsModule, CommonModule]
})
export class BarChartModule {}
