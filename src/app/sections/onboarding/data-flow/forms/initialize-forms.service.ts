import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

import { BasicInfoService } from './basic-info';
import { BeneficialOwnersService } from './beneficial-owners';
import { FinancialAndEconomicActivityService } from './financial-and-economic-activity';
import { PlanningOperationsAndPayoutToolService } from './planning-operations-and-payout-tool';
import { QuestionaryFormService } from './questionary-form.service';
import { RussianLegalOwnerService } from './russian-legal-owner';
import { RussianPrivateEntityService } from './russian-private-entity/russian-private-entity.service';

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

    subscribe() {
        for (const service of this.initializeContainer) {
            this.subs = [...this.subs, service.initForm(), service.startFormValidityReporting()];
        }
    }

    unsubscribe() {
        for (const sub of this.subs) {
            sub.unsubscribe();
        }
    }
}
