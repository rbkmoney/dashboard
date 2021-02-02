import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationDetailsComponent } from './organization-details.component';

const routes: Routes = [
    {
        path: ':orgId',
        component: OrganizationDetailsComponent,
        children: [
            {
                path: '',
                redirectTo: 'members',
            },
            {
                path: 'members',
                loadChildren: () => import('./members').then((m) => m.MembersModule),
            },
            {
                path: 'invitations',
                loadChildren: () => import('./invitations').then((m) => m.InvitationsModule),
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrganizationDetailsRoutingModule {}
