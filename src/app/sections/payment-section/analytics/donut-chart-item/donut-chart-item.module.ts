import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BarChartModule } from '@dsh/components/charts/bar-chart';
import { DonutChartModule } from '@dsh/components/charts/donut-chart';
import { BootstrapIconModule, SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { DonutChartItemComponent } from './donut-chart-item.component';

@NgModule({
    imports: [
        CommonModule,
        CardModule,
        BarChartModule,
        FlexModule,
        SpinnerModule,
        TranslocoModule,
        DonutChartModule,
        BootstrapIconModule,
    ],
    declarations: [DonutChartItemComponent],
    exports: [DonutChartItemComponent],
})
export class DonutChartItemModule {}
