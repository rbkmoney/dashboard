import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiKeyComponent } from './api-key.component';

const ROUTES: Routes = [
    {
        path: '',
        component: ApiKeyComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
})
export class ApiKeyRoutingModule {}
