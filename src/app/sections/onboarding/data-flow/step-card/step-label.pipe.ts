import { Pipe, PipeTransform } from '@angular/core';

import { StepName } from '../step-flows';

@Pipe({
    name: 'stepLabel'
})
export class StepLabelPipe implements PipeTransform {
    transform(value: StepName): string {
        const p = 'sections.onboarding.dataFlow.stepCard';
        switch (value) {
            case StepName.BasicInfo:
                return `${p}.basicInfo`;
            case StepName.BeneficialOwners:
                return `${p}.beneficialOwners`;
            case StepName.DocumentsUpload:
                return `${p}.documentsUpload`;
            case StepName.FinancialAndEconomicActivity:
                return `${p}.financialAndEconomicActivity`;
            case StepName.PlanningOperationsAndPayoutTool:
                return `${p}.planningOperationsAndPayoutTool`;
            case StepName.RussianLegalOwner:
                return `${p}.russianLegalOwner`;
            case StepName.RussianPrivateEntity:
                return `${p}.russianPrivateEntity`;
        }
        return value;
    }
}
