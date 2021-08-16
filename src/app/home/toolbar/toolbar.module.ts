import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

import { SectionsLinksModule } from '@dsh/app/shared/services/sections-links';

import { ActionbarModule } from '../actionbar';
import { BrandModule } from '../brand';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        BrandModule,
        ActionbarModule,
        RouterModule,
        MatTabsModule,
        SectionsLinksModule,
    ],
    declarations: [ToolbarComponent],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
