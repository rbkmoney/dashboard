import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics.component';

const operationsRoutes: Routes = [
    {
        path: '',
        component: AnalyticsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(operationsRoutes)],
    exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
