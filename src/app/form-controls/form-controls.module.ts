import { NgModule } from '@angular/core';
import { TextMaskModule } from 'angular2-text-mask';

import { BinInputModule } from './card-controls/bin-input/bin-input.module';
import { CardInputModule } from './card-controls/card-input/card-input.module';

@NgModule({
    imports: [BinInputModule, CardInputModule, TextMaskModule],
    exports: [BinInputModule, CardInputModule, TextMaskModule]
})
export class FormControlsModule {}
