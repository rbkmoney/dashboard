import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material';

import { StateNavComponent } from './state-nav.component';
import { StateNavItemComponent } from './state-nav-item';

const EXPORTED_DECLARATIONS = [StateNavComponent, StateNavItemComponent];

@NgModule({
    imports: [FlexModule, CommonModule, MatIconModule],
    declarations: EXPORTED_DECLARATIONS,
    entryComponents: [],
    exports: EXPORTED_DECLARATIONS
})
export class StateNavModule {}
