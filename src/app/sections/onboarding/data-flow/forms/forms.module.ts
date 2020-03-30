import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { TextMaskModule } from 'angular2-text-mask';

import { ButtonModule } from '@dsh/components/buttons';
import { FormControlsModule } from '@dsh/components/form-controls';

import { DaDataModule } from '../../../../dadata';
import { BasicInfoComponent, BasicInfoService } from './basic-info';
import { BeneficialOwnersComponent, BeneficialOwnersService } from './beneficial-owners';
import {
    FinancialAndEconomicActivityComponent,
    FinancialAndEconomicActivityService
} from './financial-and-economic-activity';
import { InitializeFormsService } from './initialize-forms.service';
import {
    PlanningOperationsAndPayoutToolComponent,
    PlanningOperationsAndPayoutToolService
} from './planning-operations-and-payout-tool';
import { RussianLegalOwnerComponent, RussianLegalOwnerService } from './russian-legal-owner';
import { RussianPrivateEntityComponent } from './russian-private-entity';
import { RussianPrivateEntityService } from './russian-private-entity/russian-private-entity.service';
import {
    AuthorityConfirmingDocumentComponent,
    AuthorityConfirmingDocumentService,
    IndividualResidencyInfoComponent,
    IndividualResidencyInfoService,
    LegalResidencyInfoComponent,
    LegalResidencyInfoService,
    PdlInfoComponent,
    PdlInfoService,
    PrivateEntityInfoComponent,
    PrivateEntityInfoService,
    RussianDomesticPassportComponent,
    RussianDomesticPassportService
} from './subforms';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatDatepickerModule,
        MatCheckboxModule,
        TranslocoModule,
        MatSelectModule,
        ButtonModule,
        MatDividerModule,
        MatRadioModule,
        TextMaskModule,
        FormControlsModule,
        DaDataModule
    ],
    declarations: [
        BasicInfoComponent,
        RussianPrivateEntityComponent,
        RussianLegalOwnerComponent,
        RussianDomesticPassportComponent,
        PdlInfoComponent,
        AuthorityConfirmingDocumentComponent,
        FinancialAndEconomicActivityComponent,
        PrivateEntityInfoComponent,
        BeneficialOwnersComponent,
        PlanningOperationsAndPayoutToolComponent,
        IndividualResidencyInfoComponent,
        LegalResidencyInfoComponent
    ],
    providers: [
        InitializeFormsService,
        BasicInfoService,
        RussianLegalOwnerService,
        RussianDomesticPassportService,
        PdlInfoService,
        AuthorityConfirmingDocumentService,
        FinancialAndEconomicActivityService,
        PrivateEntityInfoService,
        BeneficialOwnersService,
        PlanningOperationsAndPayoutToolService,
        IndividualResidencyInfoService,
        RussianPrivateEntityService,
        LegalResidencyInfoService
    ]
})
export class OnboardingFormsModule {}
