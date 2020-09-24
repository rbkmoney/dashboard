import { Component, Inject, OnInit } from '@angular/core';

import { LAYOUT_GAP } from '../../../constants';
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
        private receiveWebhooksService: ReceiveWebhooksService,
        @Inject(LAYOUT_GAP) public layoutGap: string
    ) {}

    ngOnInit(): void {
        this.receiveWebhooksService.receiveWebhooks();
    }
}
