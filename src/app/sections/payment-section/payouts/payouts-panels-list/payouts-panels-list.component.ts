import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

import { Payout } from '../../../../api-codegen/anapi';
import { CreatePayoutReportService } from '../create-payout-report';
import { PayoutsService } from '../payouts.service';
import { PayoutsPanelsListService } from './payouts-panels-list.service';

@Component({
    selector: 'dsh-payouts-panels-list',
    templateUrl: 'payouts-panels-list.component.html',
    providers: [PayoutsPanelsListService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutsPanelsListComponent implements OnInit, OnDestroy {
    payouts$ = this.payoutsService.searchResult$;
    selectedIdx$ = this.payoutsService.selectedIdx$;

    constructor(
        private payoutPanelService: PayoutsPanelsListService,
        private payoutsService: PayoutsService,
        private createPayoutReportService: CreatePayoutReportService
    ) {}

    ngOnInit() {
        this.createPayoutReportService.init();
    }

    ngOnDestroy(): void {
        this.createPayoutReportService.destroy();
    }

    createReport(payout: Payout) {
        this.createPayoutReportService.createPayoutReport(payout);
    }

    getPaymentSummary(payout: Payout) {
        return payout.payoutSummary.find(({ type }) => type === 'payment');
    }

    getRefundSummary(payout: Payout) {
        return payout.payoutSummary.find(({ type }) => type === 'refund');
    }

    getShopInfo(shopID: string) {
        return this.payoutPanelService.shopsInfo$.pipe(map((p) => p.find((s) => s.shopID === shopID)));
    }

    select(idx: number) {
        this.payoutsService.select(idx);
    }
}
