import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { ShopService } from '../../../api/shop';
import { WebhooksModule as ApiWebhooksModule } from '../../../api/webhooks';
import { ReceiveWebhooksService } from './receive-webhooks.service';
import { WebhookCardModule } from './webhook-card/webhook-card.module';
import { WebhooksRoutingModule } from './webhooks-routing.module';
import { WebhooksComponent } from './webhooks.component';

@NgModule({
    imports: [WebhooksRoutingModule, ApiWebhooksModule, WebhookCardModule, CommonModule, FlexModule],
    declarations: [WebhooksComponent],
    providers: [ReceiveWebhooksService, ShopService]
})
export class WebhooksModule {}
