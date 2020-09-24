import { Component, OnInit } from '@angular/core';

import { ReceiveIdentitiesService } from './receive-identities.service';
import { ReceiveWebhooksService } from './receive-webhooks.service';

@Component({
    templateUrl: 'webhooks.component.html',
    providers: [ReceiveWebhooksService],
})
export class WebhooksComponent implements OnInit {
    webhooks$ = this.receiveWebhooksService.webhooks$;
    isLoading$ = this.receiveWebhooksService.isLoading$;

    identities$ = this.receiveIdentitiesService.identities$;

    constructor(
        private receiveIdentitiesService: ReceiveIdentitiesService,
        private receiveWebhooksService: ReceiveWebhooksService
    ) {}

    ngOnInit() {
        this.receiveWebhooksService.receiveWebhooks();
    }
}
