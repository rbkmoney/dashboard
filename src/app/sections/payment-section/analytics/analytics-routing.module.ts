import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics.component';

const OPERATIONS_ROUTES: Routes = [
    {
        path: '',
        component: AnalyticsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(OPERATIONS_ROUTES)],
    exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
