import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanySearchComponent } from './company-search';
import { DocumentUploadComponent } from './document-upload';

export const routes: Routes = [
    {
        path: '',
        component: CompanySearchComponent
    },
    {
        path: ':claimID/document-upload',
        component: DocumentUploadComponent
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
