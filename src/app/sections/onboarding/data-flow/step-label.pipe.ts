import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { StepName } from './step-flow';

@Pipe({
    name: 'stepLabel',
})
export class StepLabelPipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(value: StepName, pathSection: string): string {
        let path;
        switch (value) {
            case StepName.BasicInfo:
                path = 'basicInfo';
                break;
            case StepName.BeneficialOwners:
                path = 'beneficialOwners';
                break;
            case StepName.FinancialAndEconomicActivity:
                path = 'financialAndEconomicActivity';
                break;
            case StepName.PlanningOperationsAndPayoutTool:
                path = 'planningOperationsAndPayoutTool';
                break;
            case StepName.RussianLegalOwner:
                path = 'russianLegalOwner';
                break;
            case StepName.RussianPrivateEntity:
                path = 'russianPrivateEntity';
                break;
        }
        return path ? this.transloco.translate(`onboarding.dataFlow.${pathSection}.${path}`) : path;
    }
}
