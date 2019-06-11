import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContainerComponent } from './container.component';
import { ToolbarModule } from './toolbar';
import { StateNavModule } from '../state-nav';

@NgModule({
    imports: [ToolbarModule, RouterModule, StateNavModule, FlexLayoutModule],
    declarations: [ContainerComponent],
    exports: [ContainerComponent]
})
export class ContainerModule {}
