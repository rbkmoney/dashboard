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
import { FromMinorModule } from '../../../../from-minor';
import { BankAccountInfoComponent } from './bank-account-info';
import { BankCardInfoComponent } from './bank-card-info';
import { CommonInfoComponent } from './common-info';
import { CreateReportDialogComponent } from './create-report-dialog';
import { InternationalBankAccountInfoComponent } from './international-bank-account-info';
import { PaymentsInfoComponent } from './payments-info';
import { PayoutToolInfoComponent } from './payout-tool-info';
import { PayoutsPanelsListComponent } from './payouts-panels-list.component';
import { RefundsInfoComponent } from './refunds-info';
import { WalletInfoComponent } from './wallet-info';

@NgModule({
    imports: [
        LayoutModule,
        MatIconModule,
        FlexLayoutModule,
        CommonModule,
        MatDividerModule,
        ButtonModule,
        TranslocoModule,
        FromMinorModule,
        SpinnerModule,
        RouterModule,
        MatDialogModule,
        ReportsModule,
        MatSnackBarModule
    ],
    declarations: [
        PayoutsPanelsListComponent,
        BankAccountInfoComponent,
        BankCardInfoComponent,
        InternationalBankAccountInfoComponent,
        WalletInfoComponent,
        CreateReportDialogComponent,
        PaymentsInfoComponent,
        RefundsInfoComponent,
        CommonInfoComponent,
        PayoutToolInfoComponent
    ],
    entryComponents: [CreateReportDialogComponent],
    exports: [PayoutsPanelsListComponent]
})
export class PayoutPanelModule {}
