import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { StateNavComponent } from './state-nav.component';
import { StateNavItemComponent } from './state-nav-item';
import { MatIconModule } from '@angular/material';

@NgModule({
    imports: [FlexModule, CommonModule, MatIconModule],
    declarations: [StateNavComponent, StateNavItemComponent],
    entryComponents: [],
    exports: [StateNavComponent, StateNavItemComponent]
})
export class StateNavModule {}
