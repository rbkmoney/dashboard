import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

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

    constructor(private webhooksPanelsListService: WebhooksPanelsListService) {}

    getIdentityName(identityID: string) {
        return this.webhooksPanelsListService.identities$?.pipe(
            map((i) => i.find(({ id }) => id === identityID)?.name)
        );
    }

    getWalletName(walletID: string) {
        return this.webhooksPanelsListService.wallets$?.pipe(map((i) => i.find(({ id }) => id === walletID)?.name));
    }

    select(idx: number) {
        this.webhooksPanelsListService.select(idx);
    }

    showMore() {
        this.webhooksPanelsListService.showMore();
    }
}
