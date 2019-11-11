import { Injectable } from '@angular/core';

import { BasicInfoService } from './basic-info';
import { QuestionaryFormService } from './questionary-form.service';
import { RussianLegalOwnerService } from './russian-legal-owner';
import { FinancialAndEconomicActivityService } from './financial-and-economic-activity';

@Injectable()
export class InitializeFormsService {
    private initializeContainer: QuestionaryFormService[];

    constructor(
        private basicInfoService: BasicInfoService,
        private russianLegalOwnerService: RussianLegalOwnerService,
        private financialAndEconomicActivityService: FinancialAndEconomicActivityService
    ) {
        this.initializeContainer = [
            this.basicInfoService,
            this.russianLegalOwnerService,
            this.financialAndEconomicActivityService
        ];
    }

    initializeForms() {
        for (const service of this.initializeContainer) {
            service.initFormValue();
            service.startFormValidityReporting();
        }
    }
}
