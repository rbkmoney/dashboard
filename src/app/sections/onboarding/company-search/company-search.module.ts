import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatRadioModule, MatSelectModule, MatSnackBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import { ButtonModule } from '@dsh/components/buttons';
import { LayoutModule } from '@dsh/components/layout';

import { KonturFocusModule } from '../../../api';
import { ConfirmActionDialogModule } from '../../../confirm-action-dialog';
import { DaDataModule } from '../../../dadata';
import { CompanyDetailItemComponent } from './company-detail-item';
import { CompanyDetailsComponent } from './company-details';
import { CompanySearchComponent } from './company-search.component';
import { ManualContractorSelectorComponent } from './manual-contractor-selector';

@NgModule({
    imports: [
        LayoutModule,
        DaDataModule,
        KonturFocusModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CommonModule,
        MatRadioModule,
        RouterModule,
        MatSelectModule,
        ButtonModule,
        MatDialogModule,
        MatSnackBarModule,
        TranslocoModule,
        ConfirmActionDialogModule
    ],
    declarations: [
        CompanySearchComponent,
        CompanyDetailsComponent,
        CompanyDetailItemComponent,
        ManualContractorSelectorComponent
    ],
    exports: [CompanySearchComponent]
})
export class CompanySearchModule {}
