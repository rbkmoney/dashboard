import { Injectable } from '@angular/core';

import { BasicInfoService } from './basic-info';
import { QuestionaryFormService } from './questionary-form.service';
import { RussianLegalOwnerService } from './russian-legal-owner';
import { FinancialAndEconomicActivityService } from './financial-and-economic-activity';
import { BeneficialOwnersService } from './beneficial-owners';
import { PlanningOperationsAndPayoutToolService } from './planning-operations-and-payout-tool';
import { RussianPrivateEntityService } from './russian-private-entity/russian-private-entity.service';

@Injectable()
export class InitializeFormsService {
    private initializeContainer: QuestionaryFormService[];

    constructor(
        private basicInfoService: BasicInfoService,
        private russianLegalOwnerService: RussianLegalOwnerService,
        private financialAndEconomicActivityService: FinancialAndEconomicActivityService,
        private beneficialOwnersService: BeneficialOwnersService,
        private planningOperationsAndPayoutToolService: PlanningOperationsAndPayoutToolService,
        private russianPrivateEntityService: RussianPrivateEntityService
    ) {
        this.initializeContainer = [
            this.basicInfoService,
            this.russianLegalOwnerService,
            this.financialAndEconomicActivityService,
            this.beneficialOwnersService,
            this.russianPrivateEntityService,
            this.planningOperationsAndPayoutToolService
        ];
    }

    initializeForms() {
        for (const service of this.initializeContainer) {
            service.initFormValue();
            service.startFormValidityReporting();
        }
    }
}
