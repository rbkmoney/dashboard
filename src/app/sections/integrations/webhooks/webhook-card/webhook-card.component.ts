import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { combineLatest, of, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { CustomersTopic, InvoicesTopic, Webhook } from '../../../../api-codegen/capi/swagger-codegen';
import { ShopService } from '../../../../api/shop';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { LAYOUT_GAP } from '../../../constants';
type CustomersEventTypesEnum = CustomersTopic.EventTypesEnum;
type InvoicesEventTypesEnum = InvoicesTopic.EventTypesEnum;

@Component({
    selector: 'dsh-webhook-card',
    templateUrl: 'webhook-card.component.html',
    styleUrls: ['webhook-card.component.scss']
})
export class WebhookCardComponent implements OnChanges {
    @Input()
    webhook: Webhook;

    events: InvoicesEventTypesEnum[] | CustomersEventTypesEnum[] = [];

    private shopID: Subject<string> = new Subject();

    shopName = this.shopID.pipe(
        switchMap(shopID => combineLatest([of(shopID), this.shopService.shops$])),
        map(([shopID, shops]) => shops.filter(shop => shop.id === shopID)),
        pluck('0', 'details', 'name'),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private shopService: ShopService) {
        this.shopName.subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.events = changes.webhook.currentValue.scope.eventTypes;
        this.shopID.next(changes.webhook.currentValue.scope.shopID);
    }
}
