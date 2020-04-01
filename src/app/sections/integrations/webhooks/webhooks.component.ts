import { Component, OnInit } from '@angular/core';

import { ReceiveWebhooksService } from './receive-webhooks.service';

@Component({
    templateUrl: 'webhooks.component.html',
    providers: [ReceiveWebhooksService]
})
export class WebhooksComponent implements OnInit {
    constructor(private receiveWebhooksService: ReceiveWebhooksService) {}

    ngOnInit(): void {
        this.receiveWebhooksService.receiveWebhooks();
    }
}