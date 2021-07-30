import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { EnvironmentSelectorModule } from '@dsh/app/shared/components/environment-selector';
import { DropdownModule } from '@dsh/components/layout';

import { ActionbarModule } from '../actionbar';
import { BrandModule } from '../brand';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarEnvironmentSelectorComponent } from './сomponents/toolbar-environment-selector';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        BrandModule,
        ActionbarModule,
        RouterModule,
        TranslocoModule,
        MatTabsModule,
        EnvironmentSelectorModule,
        MatIconModule,
        DropdownModule,
        ReactiveFormsModule,
    ],
    declarations: [ToolbarComponent, ToolbarEnvironmentSelectorComponent],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
