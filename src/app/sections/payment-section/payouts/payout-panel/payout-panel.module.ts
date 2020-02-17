import { NgModule } from '@angular/core';
import { MatIconModule, MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';

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
        FromMinorModule
    ],
    declarations: [
        PayoutPanelComponent,
        BankAccountInfoComponent,
        BankCardInfoComponent,
        InternationalBankAccountInfoComponent,
        WalletInfoComponent,
        CreateReportDialogComponent
    ],
    entryComponents: [CreateReportDialogComponent],
    exports: [PayoutPanelComponent]
})
export class PayoutPanelModule {}
