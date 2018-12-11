import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DetailsComponent } from './details.component';
import { BrandModule } from '../brand';
import { ToolbarModule } from '../toolbar';
import { ActionbarModule } from '../actionbar';

@NgModule({
    declarations: [DetailsComponent],
    imports: [CommonModule, FlexLayoutModule, MatSidenavModule, BrandModule, ToolbarModule, ActionbarModule],
    exports: [],
    providers: []
})
export class DetailsModule {}
