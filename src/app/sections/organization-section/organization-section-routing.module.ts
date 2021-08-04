import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrginizationSectionComponent } from './organization-section.component';

const ORGANIZATION_SECTION_ROUTES: Routes = [
    {
        path: '',
        component: OrginizationSectionComponent,
        children: [
            {
                path: 'organizations',
                loadChildren: () => import('./organizations').then((m) => m.OrganizationsModule),
            },
            {
                path: 'organizations/:orgId',
                loadChildren: () => import('./organization-details').then((m) => m.OrganizationDetailsModule),
            },
            {
                path: '',
                redirectTo: 'organizations',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(ORGANIZATION_SECTION_ROUTES)],
    exports: [RouterModule],
})
export class OrginizationSectionRoutingModule {}
