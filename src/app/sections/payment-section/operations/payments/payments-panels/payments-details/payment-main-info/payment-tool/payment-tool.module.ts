import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';

import { DetailsItemModule } from '@dsh/components/layout';

import { BankCardComponent } from './components/bank-card/bank-card.component';
import { DigitalWalletComponent } from './components/digital-wallet/digital-wallet.component';
import { MobileCommerceComponent } from './components/mobile-commerce/mobile-commerce.component';
import { PaymentTerminalComponent } from './components/payment-terminal/payment-terminal.component';
import { PaymentToolComponent } from './payment-tool.component';
import { BankCardPipe } from './pipes';

@NgModule({
    imports: [TranslocoModule, CommonModule, FlexModule, MatIconModule, DetailsItemModule],
    declarations: [
        PaymentToolComponent,
        BankCardComponent,
        DigitalWalletComponent,
        PaymentTerminalComponent,
        MobileCommerceComponent,
        BankCardPipe,
    ],
    exports: [PaymentToolComponent],
})
export class PaymentToolModule {}
