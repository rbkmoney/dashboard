import { NgModule } from '@angular/core';

import { BootstrapIconModule } from './bootstrap-icon';
import { LastUpdatedModule } from './last-updated/last-updated.module';
import { ResizedModule } from './resized';
import { SpinnerModule } from './spinner';
import { StatusModule } from './status';
import { TextColorModule } from './text-color';

const EXPORTED_MODULES = [
    ResizedModule,
    SpinnerModule,
    StatusModule,
    LastUpdatedModule,
    TextColorModule,
    BootstrapIconModule,
];

@NgModule({
    imports: EXPORTED_MODULES,
    exports: EXPORTED_MODULES,
})
export class IndicatorsModule {}
