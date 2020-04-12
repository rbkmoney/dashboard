import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs/operators';

import { Payout } from '../../../../api-codegen/anapi';
import { PayoutsService } from '../payouts.service';
import { PayoutPanelService } from './payout-panel.service';

@Component({
    selector: 'dsh-payout-panel',
    templateUrl: 'payout-panel.component.html',
    providers: [PayoutPanelService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayoutPanelComponent {
    payouts$ = this.payoutsService.searchResult$;
    selectedIdx$ = this.payoutsService.selectedIdx$;

    constructor(private payoutPanelService: PayoutPanelService, private payoutsService: PayoutsService) {}

    createReport(payout: Payout) {
        this.payoutPanelService.createReport(payout);
    }

    getPaymentSummary(payout: Payout) {
        return payout.payoutSummary.find(({ type }) => type === 'payment');
    }

    getRefundSummary(payout: Payout) {
        return payout.payoutSummary.find(({ type }) => type === 'refund');
    }

    getShopInfo(shopID: string) {
        return this.payoutPanelService.shopsInfo$.pipe(map(p => p.find(s => s.shopID === shopID)));
    }

    select(idx: number) {
        this.payoutsService.select(idx);
    }
}
