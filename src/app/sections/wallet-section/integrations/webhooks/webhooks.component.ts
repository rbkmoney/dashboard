import { Component, OnInit } from '@angular/core';

import { CreateWebhookService } from './create-webhook';
import { ReceiveWebhooksService } from './receive-webhooks.service';
import { WebhooksExpandedIdManager } from './webhooks-expanded-id-manager.service';

@Component({
    templateUrl: 'webhooks.component.html',
    providers: [WebhooksExpandedIdManager],
})
export class WebhooksComponent implements OnInit {
    webhooks$ = this.receiveWebhooksService.webhooks$;
    isLoading$ = this.receiveWebhooksService.isLoading$;
    lastUpdated$ = this.receiveWebhooksService.lastUpdated$;
    expandedId$ = this.webhooksExpandedIdManager.expandedId$;

    constructor(
        private receiveWebhooksService: ReceiveWebhooksService,
        private createWebhookService: CreateWebhookService,
        private webhooksExpandedIdManager: WebhooksExpandedIdManager
    ) {}

    ngOnInit() {
        this.receiveWebhooksService.receiveWebhooks();
    }

    createWebhook() {
        this.createWebhookService.createWebhook();
    }

    receiveWebhooks() {
        this.receiveWebhooksService.receiveWebhooks();
    }

    expandedIdChange(id: number) {
        this.webhooksExpandedIdManager.expandedIdChange(id);
    }
}
