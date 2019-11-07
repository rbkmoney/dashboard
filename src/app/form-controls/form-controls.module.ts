import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

import { BinInputModule, LastDigitsInputModule } from './bank-card-controls';

const EXPORTED_DECLARATIONS = [BinInputModule, LastDigitsInputModule, TextMaskModule];

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class FormControlsModule {}
