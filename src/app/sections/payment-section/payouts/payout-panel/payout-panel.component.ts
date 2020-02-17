import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { filter, map, shareReplay } from 'rxjs/operators';

import { Payout } from '../../../../api-codegen/anapi';
import { CreateReportDialogComponent } from '../create-report-dialog';
import { mapToShopInfo } from '../../operations/operators';
import { ShopService } from '../../../../api';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Component({
    selector: 'dsh-payout-panel',
    templateUrl: 'payout-panel.component.html',
    styleUrls: ['payout-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayoutPanelComponent {
    @Input() payout: Payout;

    get shop$() {
        return this.shopService.shops$.pipe(
            mapToShopInfo,
            map(shops => shops.find(({ shopID }) => shopID === this.payout.shopID)),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    get payment() {
        return this.payout.payoutSummary.find(p => p.type === 'payment');
    }

    get refund() {
        return this.payout.payoutSummary.find(p => p.type === 'refund');
    }

    constructor(private dialog: MatDialog, private shopService: ShopService) {}

    create() {
        return this.dialog
            .open(CreateReportDialogComponent, {
                width: '560px',
                disableClose: true
            })
            .afterClosed()
            .pipe(filter(r => r === 'created'))
            .subscribe();
    }
}
