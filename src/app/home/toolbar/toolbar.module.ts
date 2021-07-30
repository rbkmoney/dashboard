import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { RealmSelectorModule } from '@dsh/app/shared/components/realm-selector';
import { DropdownModule } from '@dsh/components/layout';

import { ActionbarModule } from '../actionbar';
import { BrandModule } from '../brand';
import { ToolbarComponent } from './toolbar.component';
import { ToolbarRealmSelectorComponent } from './сomponents/toolbar-realm-selector';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        BrandModule,
        ActionbarModule,
        RouterModule,
        TranslocoModule,
        MatTabsModule,
        RealmSelectorModule,
        MatIconModule,
        DropdownModule,
        ReactiveFormsModule,
    ],
    declarations: [ToolbarComponent, ToolbarRealmSelectorComponent],
    exports: [ToolbarComponent],
})
export class ToolbarModule {}
