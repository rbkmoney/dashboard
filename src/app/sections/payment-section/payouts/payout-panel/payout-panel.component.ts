import { Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
import isEqual from 'lodash.isequal';

import { Payout, PayoutSummaryItem } from '../../../../api-codegen/anapi';
import { PayoutPanelService } from './payout-panel.service';

@Component({
    selector: 'dsh-payout-panel',
    templateUrl: 'payout-panel.component.html',
    styleUrls: ['payout-panel.component.scss'],
    providers: [PayoutPanelService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayoutPanelComponent implements OnChanges {
    @Input() payout: Payout;
    shopInfo$ = this.payoutPanelService.shopInfo$;
    paymentsSummary: PayoutSummaryItem;
    refundsSummary: PayoutSummaryItem;

    constructor(private payoutPanelService: PayoutPanelService) {}

    ngOnChanges({ payout }: SimpleChanges) {
        if (!isEqual(payout.previousValue, payout.currentValue)) {
            this.paymentsSummary = payout.currentValue.payoutSummary.find(p => p.type === 'payment');
            this.refundsSummary = payout.currentValue.payoutSummary.find(p => p.type === 'refund');
            this.payoutPanelService.getShopInfo(this.payout.shopID);
        }
    }

    create() {
        this.payoutPanelService.createReport(this.payout);
    }
}
