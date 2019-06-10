import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContainerComponent } from './container.component';
import { ToolbarModule } from './toolbar';
import { SideMenuModule } from '../side-menu';

@NgModule({
    imports: [ToolbarModule, RouterModule, SideMenuModule, FlexLayoutModule],
    declarations: [ContainerComponent],
    exports: [ContainerComponent]
})
export class ContainerModule {}
