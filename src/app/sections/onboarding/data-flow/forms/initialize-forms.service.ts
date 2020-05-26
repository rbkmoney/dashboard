import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { BasicInfoService } from './basic-info';
import { BeneficialOwnersService } from './beneficial-owners';
import { FinancialAndEconomicActivityService } from './financial-and-economic-activity';
import { PlanningOperationsAndPayoutToolService } from './planning-operations-and-payout-tool';
import { QuestionaryFormService } from './questionary-form.service';
import { RussianLegalOwnerService } from './russian-legal-owner';
import { RussianPrivateEntityService } from './russian-private-entity/russian-private-entity.service';
import { UploadDocumentsService } from './upload-documents/upload-documents.service';

@Injectable()
export class InitializeFormsService {
    private initializeContainer: QuestionaryFormService[];

    private subs: Subscription[] = [];

    constructor(
        private basicInfoService: BasicInfoService,
        private russianLegalOwnerService: RussianLegalOwnerService,
        private financialAndEconomicActivityService: FinancialAndEconomicActivityService,
        private beneficialOwnersService: BeneficialOwnersService,
        private planningOperationsAndPayoutToolService: PlanningOperationsAndPayoutToolService,
        private russianPrivateEntityService: RussianPrivateEntityService,
        private uploadDocumentsService: UploadDocumentsService
    ) {
        this.initializeContainer = [
            this.basicInfoService,
            this.russianLegalOwnerService,
            this.financialAndEconomicActivityService,
            this.beneficialOwnersService,
            this.russianPrivateEntityService,
            this.planningOperationsAndPayoutToolService,
            this.uploadDocumentsService,
        ];
    }

    subscribe() {
        this.subs = [
            ...this.initializeContainer.map((service) => service.startFormValidityReporting()),
            ...this.initializeContainer.map((service) => service.startFormControlsValidationCheck()),
        ];
    }

    unsubscribe() {
        for (const sub of this.subs) {
            sub.unsubscribe();
        }
    }
}
