import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';

export const routes: Routes = [
    {
        path: '',
        component: OrganizationsComponent,
        children: [
            {
                path: 'accept-invitation',
                loadChildren: () => import('./accept-invitation').then((m) => m.AcceptInvitationModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationsRoutingModule {}
