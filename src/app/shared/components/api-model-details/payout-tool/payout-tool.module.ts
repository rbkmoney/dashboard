import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '@dsh/components/layout';

import { BankAccountDetailsModule } from '../bank-account-details';
import { PayoutToolDetailsModule } from '../payout-tool-details';
import { PayoutToolComponent } from './payout-tool.component';

@NgModule({
    imports: [
        FlexLayoutModule,
        TranslocoModule,
        CommonModule,
        LayoutModule,
        BankAccountDetailsModule,
        MatDividerModule,
        PayoutToolDetailsModule,
    ],
    declarations: [PayoutToolComponent],
    exports: [PayoutToolComponent],
})
export class PayoutToolModule {}
