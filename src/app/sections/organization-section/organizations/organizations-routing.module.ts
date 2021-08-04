import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';

export const ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: OrganizationsComponent,
            },
            {
                path: 'accept-invitation',
                loadChildren: () => import('./accept-invitation').then((m) => m.AcceptInvitationModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
