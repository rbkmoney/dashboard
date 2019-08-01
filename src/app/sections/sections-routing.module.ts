import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { AnalyticsComponent } from './analytics';
import { ButtonsComponent } from './buttons';
import { InputsComponent } from './inputs/inputs.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
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
        path: 'claim',
        loadChildren: () => import('./claim').then(m => m.ClaimModule)
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' })],
    exports: [RouterModule]
})
export class SectionsRoutingModule {}
