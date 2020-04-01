import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';

import { StateNavItemComponent } from './state-nav-item';
import { StateNavComponent } from './state-nav.component';

const EXPORTED_DECLARATIONS = [StateNavComponent, StateNavItemComponent];

@NgModule({
    imports: [FlexModule, CommonModule, MatIconModule],
    declarations: EXPORTED_DECLARATIONS,
    entryComponents: [],
    exports: EXPORTED_DECLARATIONS
})
export class StateNavModule {}
