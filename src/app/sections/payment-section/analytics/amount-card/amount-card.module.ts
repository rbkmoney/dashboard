import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AmountCardComponent } from './amount-card.component';
import { AmountChangeComponent } from './amount-change';
import { CardModule } from '../../../../layout/card';

@NgModule({
    imports: [CommonModule, CardModule, FlexLayoutModule],
    exports: [AmountCardComponent],
    declarations: [AmountCardComponent, AmountChangeComponent]
})
export class AmountCardModule {}
