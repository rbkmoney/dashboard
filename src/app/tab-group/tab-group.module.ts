import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';

import { LayoutModule } from '../layout';
import { TabGroupComponent } from './tab-group.component';
import { TabComponent } from './tab/tab.component';

@NgModule({
    declarations: [TabGroupComponent, TabComponent],
    imports: [CommonModule, LayoutModule, MatTabsModule],
    exports: [TabGroupComponent, TabComponent],
    providers: []
})
export class TabGroupModule {}
