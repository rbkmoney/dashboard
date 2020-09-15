import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { BankAccountDetailsModule } from '../bank-account-details';
import { BankCardComponent } from './bank-card';
import { InternationalBankAccountComponent } from './international-bank-account';
import { PayoutToolDetailsComponent } from './payout-tool-details.component';
import { WalletComponent } from './wallet';

@NgModule({
    imports: [
        FlexLayoutModule,
        TranslocoModule,
        CommonModule,
        LayoutModule,
        BankAccountDetailsModule,
        MatDividerModule,
    ],
    declarations: [PayoutToolDetailsComponent, InternationalBankAccountComponent, BankCardComponent, WalletComponent],
    exports: [PayoutToolDetailsComponent],
})
export class PayoutToolDetailsModule {}
