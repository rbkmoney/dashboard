import { Component, Inject, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';

import { LAYOUT_GAP } from '../../../constants';
import { CreateWebhookService } from './create-webhook.service';
import { ReceiveWebhooksService } from './receive-webhooks.service';

@Component({
    templateUrl: 'webhooks.component.html'
})
export class WebhooksComponent implements OnInit {
    webhooks$ = this.receiveWebhooksService.webhooksChunk$.pipe(tap(q => console.log(q)));
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

    getMoreWebhooks() {
        this.receiveWebhooksService.getMoreWebhooks();
    }
}
