import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatDividerModule, MatIconModule, MatSnackBarModule } from '@angular/material';
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
import { PayoutPanelAccordionComponent } from './payout-panel-accordion.component';
import { PayoutPanelComponent } from './payout-panel.component';
import { PayoutToolInfoComponent } from './payout-tool-info';
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
        PayoutPanelComponent,
        BankAccountInfoComponent,
        BankCardInfoComponent,
        InternationalBankAccountInfoComponent,
        WalletInfoComponent,
        CreateReportDialogComponent,
        PaymentsInfoComponent,
        RefundsInfoComponent,
        CommonInfoComponent,
        PayoutToolInfoComponent,
        PayoutPanelAccordionComponent
    ],
    entryComponents: [CreateReportDialogComponent],
    exports: [PayoutPanelComponent, PayoutPanelAccordionComponent]
})
export class PayoutPanelModule {}
