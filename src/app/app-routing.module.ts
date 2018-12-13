import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main';
import { PageNotFoundComponent } from './page-not-found';
import { PartyMngComponent } from './party-mgt';
import { DetailsComponent } from './details';

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
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
