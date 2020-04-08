import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import isEqual from 'lodash.isequal';
import { pluck } from 'rxjs/operators';

import { InvoicesTopic, Webhook } from '../../../../../api-codegen/capi/swagger-codegen';
import { LAYOUT_GAP } from '../../../../constants';
import { WebhookPanelService } from './webhook-panel.service';

type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

@Component({
    selector: 'dsh-webhook-panel',
    templateUrl: 'webhook-panel.component.html',
    providers: [WebhookPanelService]
})
export class WebhookPanelComponent implements OnChanges {
    @Input()
    webhook: Webhook;

    events: InvoicesEventTypesEnum[] = [];

    shopName$ = this.webhookPanelService.shopInfo$.pipe(pluck('name'));

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private webhookPanelService: WebhookPanelService) {}

    ngOnChanges({ webhook }: SimpleChanges) {
        if (!isEqual(webhook.previousValue, webhook.currentValue)) {
            const {
                scope: { eventTypes, shopID }
            } = webhook.currentValue;
            this.events = eventTypes;
            this.webhookPanelService.getShopInfo(shopID);
        }
    }
}
