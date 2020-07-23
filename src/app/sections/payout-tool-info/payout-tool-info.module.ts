import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { BankAccountInfoComponent } from './bank-account-info';
import { BankCardInfoComponent } from './bank-card-info';
import { InternationalBankAccountInfoComponent } from './international-bank-account-info';
import { PayoutToolInfoComponent } from './payout-tool-info.component';
import { WalletInfoComponent } from './wallet-info';

const EXPORTED_DECLARATIONS = [
    BankAccountInfoComponent,
    BankCardInfoComponent,
    InternationalBankAccountInfoComponent,
    WalletInfoComponent,
    PayoutToolInfoComponent,
];

@NgModule({
    imports: [CommonModule, LayoutModule, FlexLayoutModule, TranslocoModule, MatIconModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class PayoutToolInfoModule {}
