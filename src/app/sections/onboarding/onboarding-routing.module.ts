import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanySearchComponent } from './company-search';
import { LegalEntityComponent } from './legal-entity/legal-entity.component';

export const routes: Routes = [
    {
        path: '',
        component: CompanySearchComponent
    },
    {
        path: ':claimID/legal-entity',
        component: LegalEntityComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OnboardingRoutingModule {}
