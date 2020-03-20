import { NgModule } from '@angular/core';

import { ResizedModule } from './resized';
import { SpinnerModule } from './spinner';
import { StatusModule } from './status';

const EXPORTED_MODULES = [ResizedModule, SpinnerModule, StatusModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES
})
export class IndicatorsModule {}
