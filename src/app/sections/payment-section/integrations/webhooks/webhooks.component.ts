import { Component, Inject, OnInit } from '@angular/core';

import { LAYOUT_GAP } from '../../../constants';
import { CreateWebhookService } from './create-webhook.service';
import { ReceiveWebhooksService } from './receive-webhooks.service';

@Component({
    templateUrl: 'webhooks.component.html'
})
export class WebhooksComponent implements OnInit {
    webhooksChunk$ = this.receiveWebhooksService.webhooksChunk$;
    isLoading$ = this.receiveWebhooksService.isLoading$;
    webhooksReceived$ = this.receiveWebhooksService.webhooksReceived$;
    hasMore$ = this.receiveWebhooksService.hasMore$;

    constructor(
        private receiveWebhooksService: ReceiveWebhooksService,
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private createWebhookService: CreateWebhookService
    ) {}

    ngOnInit(): void {
        this.receiveWebhooksService.receiveWebhooks();
    }

    createWebhook() {
        this.createWebhookService.createWebhook();
    }

    getMore() {
        this.receiveWebhooksService.getMoreWebhooks();
    }
}
