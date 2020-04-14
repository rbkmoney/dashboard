import { NgModule } from '@angular/core';

import { AmountPipe } from './amount.pipe';
import { BankCardPipe } from './bank-card.pipe';

@NgModule({
    exports: [AmountPipe, BankCardPipe],
    declarations: [AmountPipe, BankCardPipe]
})
export class UtilsModule {}
