import { NgModule } from '@angular/core';

import { BankCardPipe } from './bank-card.pipe';
import { AmountPipe } from './amount.pipe';

@NgModule({
    exports: [AmountPipe, BankCardPipe],
    declarations: [AmountPipe, BankCardPipe]
})
export class UtilsModule {}
