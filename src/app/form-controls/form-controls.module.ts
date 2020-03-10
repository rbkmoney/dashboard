import { NgModule } from '@angular/core';

import { FormatInputModule } from './format-input';
import { RangeDatepickerModule } from './range-datepicker';

const EXPORTED_DECLARATIONS = [FormatInputModule, RangeDatepickerModule];

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class FormControlsModule {}
