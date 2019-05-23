import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material';

import { TabsComponent } from './tabs.component';
import { BrandModule } from '../../brand';
import { ToolbarModule } from '../../toolbar';
import { ActionbarModule } from '../../actionbar';
import { TabGroupModule } from '../../tab-group/tab-group.module';

@NgModule({
    declarations: [TabsComponent],
    imports: [FlexLayoutModule, BrandModule, ToolbarModule, ActionbarModule, TabGroupModule, MatTabsModule],
    exports: [TabsComponent]
})
export class TabsModule {}
