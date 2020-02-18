import { NgModule } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import { BarChartComponent } from './bar-chart.component';

@NgModule({
    declarations: [BarChartComponent],
    exports: [BarChartComponent],
    imports: [NgApexchartsModule],
    providers: []
})
export class BarChartModule {}
