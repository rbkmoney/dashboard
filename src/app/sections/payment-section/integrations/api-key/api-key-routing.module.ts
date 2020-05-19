import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiKeyComponent } from './api-key.component';

const routes: Routes = [
    {
        path: '',
        component: ApiKeyComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
})
export class ApiKeyRoutingModule {}
