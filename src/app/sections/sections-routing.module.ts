import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { AnalyticsComponent } from './analytics';
import { routes as claimRoutes } from './claims';
import { ButtonsComponent } from './buttons';
import { InputsComponent } from './inputs/inputs.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    ...claimRoutes,
    {
        path: 'analytics',
        component: AnalyticsComponent
    },
    {
        path: 'buttons',
        component: ButtonsComponent
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
