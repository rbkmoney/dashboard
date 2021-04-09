import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { DshTabsModule } from '@dsh/components/layout';

import { ActionbarModule } from '../actionbar';
import { BrandModule } from '../brand';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        BrandModule,
        ActionbarModule,
        DshTabsModule,
        RouterModule,
        TranslocoModule,
    ],
    declarations: [ToolbarComponent],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
