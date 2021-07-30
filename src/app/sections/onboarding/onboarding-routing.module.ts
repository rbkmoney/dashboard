import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanySearchComponent } from './company-search';

export const ROUTES: Routes = [
    {
        path: '',
        component: CompanySearchComponent,
    },
    {
        path: 'claim/:claimID',
        component: CompanySearchComponent,
    },
    {
        path: 'claim/:claimID/document/:documentID',
        loadChildren: () => import('./data-flow').then((m) => m.DataFlowModule),
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class OnboardingRoutingModule {}
