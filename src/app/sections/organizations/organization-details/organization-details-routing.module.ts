import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationDetailsComponent } from './organization-details.component';

const claimRoutes: Routes = [
    {
        path: ':orgId',
        component: OrganizationDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(claimRoutes)],
    exports: [RouterModule],
})
export class OrganizationDetailsRoutingModule {}
