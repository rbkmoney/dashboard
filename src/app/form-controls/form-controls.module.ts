import { NgModule } from '@angular/core';

import { FormatInputModule } from './format-input';

const EXPORTED_DECLARATIONS = [FormatInputModule];

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class FormControlsModule {}
