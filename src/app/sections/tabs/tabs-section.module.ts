import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrandModule } from '../../brand';
import { ToolbarModule } from '../../toolbar';
import { ActionbarModule } from '../../actionbar';
import { DshTabsModule } from '../../tabs/tabs.module';
import { TabsComponent } from './tabs.component';

@NgModule({
    declarations: [TabsComponent],
    imports: [FlexLayoutModule, BrandModule, ToolbarModule, ActionbarModule, DshTabsModule],
    exports: [TabsComponent]
})
export class TabsModule {}
