import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { AnalyticsComponent } from './analytics';
import { TableComponent } from './table';
import { OnboardingComponent } from './onboarding';
import { AboutLegalEntityComponent } from './onboarding/about-legal-entity/about-legal-entity.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'onboarding',
        component: OnboardingComponent
    },
    {
        path: 'onboarding/about-legal-entity',
        component: AboutLegalEntityComponent
    },
    {
        path: 'analytics',
        component: AnalyticsComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SectionsRoutingModule {}
