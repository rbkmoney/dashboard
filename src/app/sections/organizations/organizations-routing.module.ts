import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';

export const routes: Routes = [
    {
        path: '',
        component: OrganizationsComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./organizations').then((m) => m.OrganizationsModule),
            },
            {
                path: '',
                loadChildren: () => import('./organization-details').then((m) => m.OrganizationDetailsModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
