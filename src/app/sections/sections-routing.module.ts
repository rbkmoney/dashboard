import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { PartyMngComponent } from './party-mgt';
import { DetailsComponent } from './details';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TableComponent } from './table';

const routes: Routes = [
    {
        path: '',
        component: MainComponent
    },
    {
        path: 'organization/create',
        component: PartyMngComponent
    },
    {
        path: 'details',
        component: DetailsComponent
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
