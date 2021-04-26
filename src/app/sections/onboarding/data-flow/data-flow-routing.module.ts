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
    UploadDocumentsComponent,
} from './forms';
import { StepName } from './step-flow';

export const ROUTES: Routes = [
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
            {
                path: StepName.UploadDocuments,
                component: UploadDocumentsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class DataFlowRoutingModule {}
