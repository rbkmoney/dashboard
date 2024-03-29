import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslocoModule } from '@ngneat/transloco';

import { PayoutToolDetailsModule } from '@dsh/app/shared/components';
import { ApiModelRefsModule, ApiModelTypesModule, ToMajorModule } from '@dsh/app/shared/pipes';
import { ButtonModule } from '@dsh/components/buttons';
import { IndicatorsModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { CreatePayoutReportModule } from '../create-payout-report';
import { PayoutActionsComponent } from './payout-actions';
import { PayoutMainInfoComponent } from './payout-main-info';
import { PayoutsDetailsComponent } from './payouts-details.component';

@NgModule({
    imports: [
        TranslocoModule,
        LayoutModule,
        ButtonModule,
        FlexLayoutModule,
        CommonModule,
        MatSnackBarModule,
        MatDividerModule,
        IndicatorsModule,
        ApiModelRefsModule,
        ToMajorModule,
        CreatePayoutReportModule,
        PayoutToolDetailsModule,
        ApiModelTypesModule,
    ],
    declarations: [PayoutsDetailsComponent, PayoutActionsComponent, PayoutMainInfoComponent],
    exports: [PayoutsDetailsComponent],
})
export class PayoutsDetailsModule {}
