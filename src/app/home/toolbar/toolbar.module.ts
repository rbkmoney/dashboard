import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

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
        TranslocoModule,
        MatTabsModule,
    ],
    declarations: [ToolbarComponent],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
