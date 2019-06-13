import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material';

import { DshTabsModule } from '../../tabs/tabs.module';
import { TabsComponent } from './tabs.component';
import { CardModule } from '../../layout/card';
import { BrandModule } from '../../container/brand';
import { ToolbarModule } from '../../container/toolbar';
import { ActionbarModule } from '../../container/actionbar';
import { ChartsModule } from '../../charts';

@NgModule({
    declarations: [TabsComponent],
    imports: [
        FlexLayoutModule,
        BrandModule,
        ToolbarModule,
        ActionbarModule,
        DshTabsModule,
        MatTabsModule,
        CardModule,
        ChartsModule
    ],
    exports: [TabsComponent]
})
export class TabsModule {}
