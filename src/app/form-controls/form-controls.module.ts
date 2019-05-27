import { NgModule } from '@angular/core';

import { BinInputModule } from './bin-input/bin-input.module';
import { CardInputModule } from './card-input/card-input.module';

@NgModule({
    imports: [BinInputModule, CardInputModule],
    exports: [BinInputModule, CardInputModule]
})
export class FormControlsModule {}
