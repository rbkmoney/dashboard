import { NgModule } from '@angular/core';

import { WebhooksModule as ApiWebhooksModule } from '../../../api/webhooks';
import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';

@NgModule({
    imports: [WebhooksRoutingModule, ApiWebhooksModule],
    declarations: [WebhooksComponent]
})
export class WebhooksModule {}
