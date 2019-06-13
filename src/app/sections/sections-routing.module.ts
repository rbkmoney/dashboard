import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { AnalyticsComponent } from './analytics';
import { TableComponent } from './table';
import { routes as onboargindRoutes } from './onboarding';
import { ButtonsComponent } from './buttons';
import { TabsComponent } from './tabs/tabs.component';
import { OperationsComponent } from './operations/operations.component';
import { InputsComponent } from './inputs/inputs.component';

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
        path: 'tabs',
        component: TabsComponent
    },
    {
        path: 'buttons',
        component: ButtonsComponent
    },
    {
        path: 'operations',
        component: OperationsComponent
    },
    {
        path: 'inputs',
        component: InputsComponent
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
