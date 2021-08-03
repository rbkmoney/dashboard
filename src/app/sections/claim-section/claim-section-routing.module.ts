import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimSectionComponent } from './claim-section.component';

const CLAIM_SECTION_ROUTES: Routes = [
    {
        path: '',
        component: ClaimSectionComponent,
        children: [
            {
                path: 'claims',
                loadChildren: () => import('./claims/claims.module').then((m) => m.ClaimsModule),
            },
            {
                path: 'onboarding',
                loadChildren: () => import('./onboarding/onboarding.module').then((m) => m.OnboardingModule),
            },
            { path: '', redirectTo: 'claims', pathMatch: 'full' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(CLAIM_SECTION_ROUTES)],
    exports: [RouterModule],
})
export class ClaimSectionRoutingModule {}
