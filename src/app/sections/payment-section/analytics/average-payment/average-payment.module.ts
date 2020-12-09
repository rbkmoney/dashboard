import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { AnalyticsModule } from '@dsh/api/analytics';
import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { PercentDifferenceModule } from '../percent-difference';
import { StatItemModule } from '../stat-item/stat-item.module';
import { AveragePaymentComponent } from './average-payment.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        TranslocoModule,
        MatSelectModule,
        SpinnerModule,
        AnalyticsModule,
        CardModule,
        PercentDifferenceModule,
        StatItemModule,
    ],
    declarations: [AveragePaymentComponent],
    exports: [AveragePaymentComponent],
})
export class AveragePaymentModule {}
