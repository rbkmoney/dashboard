import { NgModule } from '@angular/core';

import { ShopSelectorModule } from '../../app/sections/shop-selector';
import { FileUploaderModule } from './file-uploader';
import { FormatInputModule } from './format-input';
import { RangeDatepickerModule } from './range-datepicker';

const EXPORTED_DECLARATIONS = [FormatInputModule, RangeDatepickerModule, FileUploaderModule, ShopSelectorModule];

@NgModule({
    imports: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class FormControlsModule {}
