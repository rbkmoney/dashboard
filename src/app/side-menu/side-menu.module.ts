import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SideMenuComponent } from './side-menu.component';
import { SideMenuItemComponent } from './side-menu-item';

@NgModule({
    imports: [FlexLayoutModule],
    declarations: [SideMenuComponent, SideMenuItemComponent],
    exports: [SideMenuComponent, SideMenuItemComponent]
})
export class SideMenuModule {}
