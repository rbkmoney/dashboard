import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DetailsComponent } from './details.component';
import { BrandModule } from '../brand';
import { ToolbarModule } from '../toolbar';
import { ActionbarModule } from '../actionbar';

@NgModule({
    declarations: [DetailsComponent],
    imports: [FlexLayoutModule, MatSidenavModule, BrandModule, ToolbarModule, ActionbarModule]
})
export class DetailsModule {}
