import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReportComponent } from './report.component';

const reportDetailsRoutes: Routes = [
    {
        path: ':reportID',
        component: ReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(reportDetailsRoutes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {}
