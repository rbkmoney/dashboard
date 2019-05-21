import { Routes } from '@angular/router';

import { OnboardingComponent } from './onboarding.component';
import { LegalEntityComponent } from './legal-entity/legal-entity.component';

export const routes: Routes = [
    {
        path: 'onboarding',
        component: OnboardingComponent
    },
    {
        path: 'onboarding/legal-entity',
        component: LegalEntityComponent
    }
];
