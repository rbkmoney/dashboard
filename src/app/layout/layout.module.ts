import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CardModule } from './card';
import { LayoutComponent } from './layout.component';
import { ToolbarModule } from '../toolbar';
import { BrandModule } from '../brand';
import { ActionbarModule } from '../actionbar';
import { DocumentModule } from '../document/document.module';
import { FlexModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material';
import { LayoutService } from './layout.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CardModule,
        ToolbarModule,
        BrandModule,
        ActionbarModule,
        DocumentModule,
        RouterModule,
        FlexModule,
        MatSidenavModule,
        CommonModule
    ],
    declarations: [LayoutComponent],
    exports: [CardModule, LayoutComponent],
    providers: [LayoutService]
})
export class LayoutModule {}
