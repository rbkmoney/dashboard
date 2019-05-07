import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatFormFieldModule, MatAutocompleteModule, MatInputModule } from '@angular/material';

import { PartyMngComponent } from './party-mgt.component';
import { BrandModule } from '../../brand';
import { ToolbarModule } from '../../toolbar';
import { ActionbarModule } from '../../actionbar';
import { FormControlsModule } from '../../form-controls';
import { LayoutModule } from '../../layout';
import { DaDataModule } from '../../dadata/dadata.module';

@NgModule({
    declarations: [PartyMngComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        FlexLayoutModule,
        FormControlsModule,
        LayoutModule,
        BrandModule,
        ToolbarModule,
        ActionbarModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,
        DaDataModule
    ]
})
export class PartyMngModule {}
