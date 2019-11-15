import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatDatepickerModule, MatCheckboxModule, MatSelectModule } from '@angular/material';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';

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
    PrivateEntityInfoService
} from './subforms';
import {
    FinancialAndEconomicActivityComponent,
    FinancialAndEconomicActivityService
} from './financial-and-economic-activity';

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
        MatSelectModule
    ],
    declarations: [
        BasicInfoComponent,
        RussianPrivateEntityComponent,
        RussianLegalOwnerComponent,
        RussianDomesticPassportComponent,
        PdlInfoComponent,
        AuthorityConfirmingDocumentComponent,
        FinancialAndEconomicActivityComponent,
        PrivateEntityInfoComponent
    ],
    providers: [
        InitializeFormsService,
        BasicInfoService,
        RussianLegalOwnerService,
        RussianDomesticPassportService,
        PdlInfoService,
        AuthorityConfirmingDocumentService,
        FinancialAndEconomicActivityService,
        PrivateEntityInfoService
    ]
})
export class OnboardingFormsModule {}
