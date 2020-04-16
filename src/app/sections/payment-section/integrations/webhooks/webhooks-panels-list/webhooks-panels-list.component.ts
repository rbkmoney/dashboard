import { Component, Inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { LAYOUT_GAP } from '../../../../constants';
import { ReceiveWebhooksService } from '../receive-webhooks.service';
import { WebhooksPanelsListService } from './webhooks-panels-list.service';

@Component({
    selector: 'dsh-webhooks-panels-list',
    templateUrl: 'webhooks-panels-list.component.html',
    providers: [WebhooksPanelsListService]
})
export class WebhooksPanelsListComponent {
    webhooks$ = this.receiveWebhooksService.webhooks$;
    selectedIdx$ = this.receiveWebhooksService.selectedIdx$;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private webhooksPanelService: WebhooksPanelsListService,
        private receiveWebhooksService: ReceiveWebhooksService
    ) {}

    getShopInfo(shopID: string) {
        return this.webhooksPanelService.shopsInfo$.pipe(map(p => p.find(s => s.shopID === shopID)));
    }

    select(idx: number) {
        this.receiveWebhooksService.select(idx);
    }
}
