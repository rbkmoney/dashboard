import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UiKitModule } from '../ui-kit/ui-kit.module';
import { PartyMngComponent } from './party-mgt.component';
import { BrandModule } from '../brand';
import { ToolbarModule } from '../toolbar';
import { ActionbarModule } from '../actionbar';

@NgModule({
    declarations: [PartyMngComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        FlexLayoutModule,
        UiKitModule,
        BrandModule,
        ToolbarModule,
        ActionbarModule
    ]
})
export class PartyMngModule {}
