import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { SpinnerModule } from '@dsh/components/indicators';
import { LayoutModule } from '@dsh/components/layout';

import { ReportsModule } from '../../../../api';
import { ToMajorModule } from '../../../../to-major';
import { PayoutToolInfoModule } from '../../../payout-tool-info';
import { CreatePayoutReportModule } from '../create-payout-report';
import { CommonInfoComponent } from './common-info';
import { PaymentsInfoComponent } from './payments-info';
import { PayoutsPanelsListComponent } from './payouts-panels-list.component';
import { RefundsInfoComponent } from './refunds-info';

@NgModule({
    imports: [
        LayoutModule,
        MatIconModule,
        FlexLayoutModule,
        CommonModule,
        MatDividerModule,
        ButtonModule,
        TranslocoModule,
        ToMajorModule,
        SpinnerModule,
        RouterModule,
        MatDialogModule,
        ReportsModule,
        MatSnackBarModule,
        PayoutToolInfoModule,
        CreatePayoutReportModule,
    ],
    declarations: [PayoutsPanelsListComponent, PaymentsInfoComponent, RefundsInfoComponent, CommonInfoComponent],
    exports: [PayoutsPanelsListComponent],
})
export class PayoutPanelModule {}
