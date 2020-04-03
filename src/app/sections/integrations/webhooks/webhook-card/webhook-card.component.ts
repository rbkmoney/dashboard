import { Component, Inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';

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

    events: (InvoicesEventTypesEnum | CustomersEventTypesEnum)[] = [];

    private shopID$: Subject<string> = new Subject();

    shopName$ = combineLatest([this.shopID$, this.shopService.shops$]).pipe(
        map(([shopID, shops]) => shops.filter(shop => shop.id === shopID)),
        pluck('0', 'details', 'name'),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(@Inject(LAYOUT_GAP) public layoutGap: string, private shopService: ShopService) {
        this.shopName$.subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const {
            webhook: {
                currentValue: {
                    scope: { shopID, eventTypes }
                }
            }
        } = changes;
        if (shopID && changes.webhook.previousValue?.scope.shopID !== shopID) {
            this.events = eventTypes;
            this.shopID$.next(shopID);
        }
    }
}
