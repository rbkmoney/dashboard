import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { AnalyticsComponent } from './analytics';
import { TableComponent } from './table';
import { routes as onboargindRoutes } from './onboarding';
import { ButtonsComponent } from './buttons';
import { ButtonToggleComponent } from './button-toggle';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    ...onboargindRoutes,
    {
        path: 'analytics',
        component: AnalyticsComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'buttons',
        component: ButtonsComponent
    },
    {
        path: 'button-toggle',
        component: ButtonToggleComponent
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
