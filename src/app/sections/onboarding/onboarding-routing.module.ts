import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanySearchComponent } from './company-search';

export const routes: Routes = [
    {
        path: '',
        component: CompanySearchComponent
    },
    {
        path: ':claimID/document-upload',
        loadChildren: () => import('./document-upload').then(m => m.DocumentUploadModule)
    },
    {
        path: ':claimID',
        loadChildren: () => import('./data-flow').then(m => m.DataFlowModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OnboardingRoutingModule {}
