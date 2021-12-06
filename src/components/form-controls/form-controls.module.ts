import { NgModule } from '@angular/core';

import { FileUploaderModule } from './file-uploader';
import { FormatInputModule } from './format-input';
import { SelectSearchFieldModule } from './select-search-field';

const EXPORTED_DECLARATIONS = [FormatInputModule, FileUploaderModule, SelectSearchFieldModule];

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class FormControlsModule {}
