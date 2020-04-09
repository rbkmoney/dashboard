import { Component, Inject, OnInit } from '@angular/core';

import { LAYOUT_GAP } from '../../../constants';
import { ReceiveWebhooksService } from './receive-webhooks.service';

@Component({
    templateUrl: 'webhooks.component.html'
})
export class WebhooksComponent implements OnInit {
    webhooks$ = this.receiveWebhooksService.webhooks$;

    constructor(private receiveWebhooksService: ReceiveWebhooksService, @Inject(LAYOUT_GAP) public layoutGap: string) {}

    ngOnInit(): void {
        this.receiveWebhooksService.receiveWebhooks();
    }
}
