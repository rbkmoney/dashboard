import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

import { BinInputModule, LastDigitsInputModule } from './bank-card-controls';

@NgModule({
    imports: [BinInputModule, LastDigitsInputModule, TextMaskModule],
    exports: [BinInputModule, LastDigitsInputModule, TextMaskModule]
})
export class FormControlsModule {}
