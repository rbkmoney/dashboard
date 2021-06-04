import { NgModule } from '@angular/core';

import { AutocompleteInputModule } from './autocomplete-input';
import { FileUploaderModule } from './file-uploader';
import { FormatInputModule } from './format-input';
import { RangeDatepickerModule } from './range-datepicker';

const EXPORTED_DECLARATIONS = [FormatInputModule, RangeDatepickerModule, FileUploaderModule, AutocompleteInputModule];

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class FormControlsModule {}
