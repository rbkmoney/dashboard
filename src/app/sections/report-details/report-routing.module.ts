import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportDetailsComponent } from './report-details.component';

const reportDetailsRoutes: Routes = [
    {
        path: ':reportID',
        component: ReportDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(reportDetailsRoutes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {}
