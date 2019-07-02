import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanySearchComponent } from './company-search';
import { LegalEntityComponent } from './legal-entity/legal-entity.component';

export const routes: Routes = [
    {
        path: 'onboarding',
        component: CompanySearchComponent
    },
    {
        path: 'onboarding/:claimID/legal-entity',
        component: LegalEntityComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class OnboardingRoutingModule {}
