import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicInfoComponent } from './basic-info';
import { DataFlowComponent } from './data-flow.component';

export const routes: Routes = [
    {
        path: '',
        component: DataFlowComponent,
        children: [
            {
                path: 'basic-info',
                component: BasicInfoComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataFlowRoutingModule {}
