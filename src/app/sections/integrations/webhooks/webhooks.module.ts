import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WebhooksModule as ApiWebhooksModule } from '../../../api/webhooks';
import { WebhookCardModule } from './webhook-card/webhook-card.module';
import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';

@NgModule({
    imports: [WebhooksRoutingModule, ApiWebhooksModule, WebhookCardModule, CommonModule],
    declarations: [WebhooksComponent]
})
export class WebhooksModule {}
