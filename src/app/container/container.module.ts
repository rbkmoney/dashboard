import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material';

import { ContainerComponent } from './container.component';
import { ToolbarModule } from './toolbar';
import { StateNavModule } from '../state-nav';
import { NavComponent } from './nav';

@NgModule({
    imports: [ToolbarModule, RouterModule, StateNavModule, FlexLayoutModule, MatIconModule],
    declarations: [ContainerComponent, NavComponent],
    exports: [ContainerComponent]
})
export class ContainerModule {}
