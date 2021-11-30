import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { BootstrapIconModule } from '@dsh/components/indicators';

import { StateNavItemComponent } from './state-nav-item';
import { StateNavComponent } from './state-nav.component';

const EXPORTED_DECLARATIONS = [StateNavComponent, StateNavItemComponent];

@NgModule({
    imports: [FlexModule, CommonModule, BootstrapIconModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class StateNavModule {}
