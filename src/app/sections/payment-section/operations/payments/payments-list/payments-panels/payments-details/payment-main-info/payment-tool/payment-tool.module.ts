import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { CardModule, DetailsItemModule } from '@dsh/components/layout';

import { UtilsModule as PaymentDetailsModule } from '../../../../../../../../payment-details/utils';
import { BankCardComponent } from './bank-card';
import { DigitalWalletComponent } from './digital-wallet';
import { MobileCommerceComponent } from './mobile-commerce';
import { PaymentTerminalComponent } from './payment-terminal';
import { PaymentToolComponent } from './payment-tool.component';
// TODO: fix payout tool for non bank payouts
@NgModule({
    imports: [
        TranslocoModule,
        CardModule,
        ButtonModule,
        CommonModule,
        FlexModule,
        DetailsItemModule,
        MatIconModule,
        PaymentDetailsModule,
    ],
    declarations: [
        PaymentToolComponent,
        BankCardComponent,
        DigitalWalletComponent,
        PaymentTerminalComponent,
        MobileCommerceComponent,
    ],
    exports: [PaymentToolComponent],
})
export class PaymentToolModule {}
