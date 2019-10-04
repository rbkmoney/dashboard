import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicInfoComponent } from './basic-info';
import { DataFlowComponent } from './data-flow.component';
import { RussianPrivateEntityComponent } from './russian-private-entity';
import { StepName } from './step-flow';

export const routes: Routes = [
    {
        path: '',
        component: DataFlowComponent,
        children: [
            {
                path: StepName.BasicInfo,
                component: BasicInfoComponent
            },
            {
                path: StepName.RussianPrivateEntity,
                component: RussianPrivateEntityComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataFlowRoutingModule {}
