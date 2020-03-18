import { NgModule } from '@angular/core';
import { MatIconModule, MatDividerModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';

import { PayoutPanelComponent } from './payout-panel.component';
import { LayoutModule } from '../../../../layout';
import { ButtonModule } from '../../../../button';
import { DetailsItemModule } from '../../../../details-item';
import { FromMinorModule } from '../../../../from-minor';
import { BankAccountInfoComponent } from './bank-account-info';
import { CreateReportDialogComponent } from './create-report-dialog';
import { BankCardInfoComponent } from './bank-card-info';
import { InternationalBankAccountInfoComponent } from './international-bank-account-info';
import { WalletInfoComponent } from './wallet-info';
import { SpinnerModule } from '../../../../spinner';
import { ReportsModule } from '../../../../api';
import { PaymentsInfoComponent } from './payments-info';
import { RefundsInfoComponent } from './refunds-info';
import { CommonInfoComponent } from './common-info';
import { PayoutToolInfoComponent } from './payout-tool-info';
import { PayoutPanelAccordionComponent } from './payout-panel-accordion.component';

@NgModule({
    imports: [
        LayoutModule,
        MatIconModule,
        FlexLayoutModule,
        CommonModule,
        MatDividerModule,
        DetailsItemModule,
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
