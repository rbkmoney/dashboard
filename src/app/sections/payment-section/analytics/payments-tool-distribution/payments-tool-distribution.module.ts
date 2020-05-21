import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { BarChartModule } from '@dsh/components/charts/bar-chart';
import { DonutChartModule } from '@dsh/components/charts/donut-chart';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { DonutChartItemModule } from '../donut-chart-item/donut-chart-item.module';
import { PaymentsToolDistributionComponent } from './payments-tool-distribution.component';

@NgModule({
    imports: [
        CommonModule,
        CardModule,
        BarChartModule,
        FlexModule,
        SpinnerModule,
        TranslocoModule,
        DonutChartModule,
        DonutChartItemModule,
    ],
    declarations: [PaymentsToolDistributionComponent],
    exports: [PaymentsToolDistributionComponent],
})
export class PaymentsToolDistributionModule {}
