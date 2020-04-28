import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';

import { SpinnerModule } from '@dsh/components/indicators';
import { CardModule } from '@dsh/components/layout';

import { AnalyticsModule } from '../../../../api/analytics';
import { FromMinorModule } from '../../../../from-minor';
import { PercentDifferenceModule } from '../percent-difference';
import { StatItemModule } from '../stat-item/stat-item.module';
import { PaymentsCountComponent } from './payments-count.component';

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
        FromMinorModule,
        StatItemModule
    ],
    declarations: [PaymentsCountComponent],
    exports: [PaymentsCountComponent]
})
export class PaymentsCountModule {}
