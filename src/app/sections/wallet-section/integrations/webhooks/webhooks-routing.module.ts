import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WebhooksComponent } from './webhooks.component';

const ROUTES: Routes = [
    {
        path: '',
        component: WebhooksComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
})
export class WebhooksRoutingModule {}
