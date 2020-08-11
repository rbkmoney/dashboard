import { NgModule } from '@angular/core';

import { ColoredIconModule } from './colored-icon';
import { LastUpdatedModule } from './last-updated/last-updated.module';
import { ResizedModule } from './resized';
import { SpinnerModule } from './spinner';
import { StatusModule } from './status';

const EXPORTED_MODULES = [ResizedModule, SpinnerModule, StatusModule, ColoredIconModule, LastUpdatedModule];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class IndicatorsModule {}
