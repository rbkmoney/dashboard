import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { AnalyticsComponent } from './analytics';
import { TableComponent } from './table';
import { routes as onboargindRoutes } from './onboarding';

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
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class SectionsRoutingModule {}
