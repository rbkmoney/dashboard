import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material';

import { BrandModule } from '../../brand';
import { ToolbarModule } from '../../toolbar';
import { ActionbarModule } from '../../actionbar';
import { DshTabsModule } from '../../tabs/tabs.module';
import { TabsComponent } from './tabs.component';
import { CardModule } from '../../layout/card';

@NgModule({
    declarations: [TabsComponent],
    imports: [FlexLayoutModule, BrandModule, ToolbarModule, ActionbarModule, DshTabsModule, MatTabsModule, CardModule],
    exports: [TabsComponent]
})
export class TabsModule {}
