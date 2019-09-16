import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanySearchComponent } from './company-search.component';

export const routes: Routes = [
    {
        path: 'x',
        component: CompanySearchComponent
    }
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class CompanySearchRoutingModule {}
