import { NgModule } from '@angular/core';

import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';

@NgModule({
    imports: [WebhooksRoutingModule],
    declarations: [WebhooksComponent]
})
export class WebhooksModule {}
