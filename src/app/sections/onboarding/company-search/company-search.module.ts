import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatRadioModule, MatSelectModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslocoModule } from '@ngneat/transloco';

import { LayoutModule } from '../../../layout';
import { DaDataModule } from '../../../dadata';
import { ButtonModule } from '../../../button';
import { CompanySearchComponent } from './company-search.component';
import { CompanyDetailsComponent } from './company-details';
import { LeaveOnboardingDialogComponent } from './leave-onboarding-dialog';
import { CompanyDetailItemComponent } from './company-detail-item';
import { ManualContractorSelectorComponent } from './manual-contractor-selector';

@NgModule({
    imports: [
        LayoutModule,
        DaDataModule,
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
        TranslocoModule
    ],
    declarations: [
        CompanySearchComponent,
        CompanyDetailsComponent,
        LeaveOnboardingDialogComponent,
        CompanyDetailItemComponent,
        ManualContractorSelectorComponent
    ],
    exports: [CompanySearchComponent],
    entryComponents: [LeaveOnboardingDialogComponent]
})
export class CompanySearchModule {}
