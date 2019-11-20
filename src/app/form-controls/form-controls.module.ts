import { NgModule } from '@angular/core';

import { BankCardControlsModule } from './bank-card-controls/bank-card-controls.module';

const EXPORTED_DECLARATIONS = [BankCardControlsModule];

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class FormControlsModule {}
