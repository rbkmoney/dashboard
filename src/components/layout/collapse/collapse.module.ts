import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { CollapseComponent } from './collapse.component';

const EXPORTED_DECLARATIONS = [CollapseComponent];

@NgModule({
    imports: [CommonModule, BootstrapIconModule, FlexLayoutModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class CollapseModule {}
