import { NgModule } from '@angular/core';

import { BinInputModule } from './bin-input/bin-input.module';

@NgModule({
    imports: [BinInputModule],
    exports: [BinInputModule]
})
export class FormControlsModule {}
