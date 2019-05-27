import { NgModule } from '@angular/core';

import { BinInputModule } from './bin-input/bin-input.module';
import { CardInputModule } from './card-input/card-input.module';
import { CurrencyMaskDirective } from './currency-input-mask.directive';

@NgModule({
    declarations: [CurrencyMaskDirective],
    imports: [BinInputModule, CardInputModule],
    exports: [BinInputModule, CardInputModule, CurrencyMaskDirective]
})
export class FormControlsModule {}
