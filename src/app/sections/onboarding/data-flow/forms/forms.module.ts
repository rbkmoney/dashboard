import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';

import { BasicInfoService, BasicInfoComponent } from './basic-info';
import { RussianPrivateEntityComponent } from './russian-private-entity';
import { RussianLegalOwnerComponent, RussianLegalOwnerService } from './russian-legal-owner';
import { InitializeFormsService } from './initialize-forms.service';
import {
    RussianDomesticPassportComponent,
    RussianDomesticPassportService,
    AuthorityConfirmingDocumentComponent,
    AuthorityConfirmingDocumentService,
    PdlInfoComponent,
    PdlInfoService,
    PrivateEntityInfoComponent,
    PrivateEntityInfoService,
    LegalResidencyInfoComponent,
    LegalResidencyInfoService,
    IndividualResidencyInfoComponent,
    IndividualResidencyInfoService
} from './subforms';
import {
    FinancialAndEconomicActivityComponent,
    FinancialAndEconomicActivityService
} from './financial-and-economic-activity';
import { BeneficialOwnersService, BeneficialOwnersComponent } from './beneficial-owners';
import { ButtonModule } from '../../../../button';
import {
    PlanningOperationsAndPayoutToolComponent,
    PlanningOperationsAndPayoutToolService
} from './planning-operations-and-payout-tool';
import { FormControlsModule } from '../../../../form-controls';
import { RussianPrivateEntityService } from './russian-private-entity/russian-private-entity.service';
import { DaDataModule } from '../../../../dadata';

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
