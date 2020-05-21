import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataFlowComponent } from './data-flow.component';
import {
    BasicInfoComponent,
    BeneficialOwnersComponent,
    FinancialAndEconomicActivityComponent,
    PlanningOperationsAndPayoutToolComponent,
    RussianLegalOwnerComponent,
    RussianPrivateEntityComponent,
} from './forms';
import { StepName } from './step-flow';

export const routes: Routes = [
    {
        path: 'step',
        component: DataFlowComponent,
        children: [
            {
                path: StepName.BasicInfo,
                component: BasicInfoComponent,
            },
            {
                path: StepName.RussianPrivateEntity,
                component: RussianPrivateEntityComponent,
            },
            {
                path: StepName.RussianLegalOwner,
                component: RussianLegalOwnerComponent,
            },
            {
                path: StepName.FinancialAndEconomicActivity,
                component: FinancialAndEconomicActivityComponent,
            },
            {
                path: StepName.BeneficialOwners,
                component: BeneficialOwnersComponent,
            },
            {
                path: StepName.PlanningOperationsAndPayoutTool,
                component: PlanningOperationsAndPayoutToolComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DataFlowRoutingModule {}
