import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportsComponent } from './reports.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ReportsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class ReportsRoutingModule {}
