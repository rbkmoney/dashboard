import { Component, Inject } from '@angular/core';
import { map } from 'rxjs/operators';

import { LAYOUT_GAP } from '../../../../constants';
import { WebhooksPanelsListService } from './webhooks-panels-list.service';

@Component({
    selector: 'dsh-webhooks-panels-list',
    templateUrl: 'webhooks-panels-list.component.html',
    providers: [WebhooksPanelsListService],
})
export class WebhooksPanelsListComponent {
    webhooks$ = this.webhooksPanelsListService.webhooks$;
    selectedPanelPosition$ = this.webhooksPanelsListService.selectedPanelPosition$;
    hasMore$ = this.webhooksPanelsListService.hasMore$;

    constructor(
        @Inject(LAYOUT_GAP) public layoutGap: string,
        private webhooksPanelsListService: WebhooksPanelsListService
    ) {}

    getShopInfo(shopID: string) {
        return this.webhooksPanelsListService.shopsInfo$.pipe(map((p) => p.find((s) => s.shopID === shopID)));
    }

    select(idx: number) {
        this.webhooksPanelsListService.select(idx);
    }

    showMore() {
        this.webhooksPanelsListService.showMore();
    }
}
