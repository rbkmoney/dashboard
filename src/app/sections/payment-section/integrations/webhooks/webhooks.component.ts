import { Component, Inject, OnInit } from '@angular/core';

import { LAYOUT_GAP } from '../../../constants';
import { CreateWebhookService } from './create-webhook.service';
import { ReceiveWebhooksService } from './receive-webhooks.service';

@Component({
    templateUrl: 'webhooks.component.html'
})
export class WebhooksComponent implements OnInit {
    webhooks$ = this.receiveWebhooksService.webhooks$;

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
}
