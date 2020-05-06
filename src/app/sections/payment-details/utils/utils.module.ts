import { NgModule } from '@angular/core';

import { AmountPipe } from './amount.pipe';
import { BankCardPipe } from './bank-card.pipe';
import { CurrencySymbolPipe } from './currency-symbol.pipe';

@NgModule({
    exports: [AmountPipe, BankCardPipe, CurrencySymbolPipe],
    declarations: [AmountPipe, BankCardPipe, CurrencySymbolPipe]
})
export class UtilsModule {}
