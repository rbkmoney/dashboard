import { MatDialog } from '@angular/material';
import { map, shareReplay } from 'rxjs/operators';
import moment from 'moment';
import { Injectable } from '@angular/core';

import { Payout } from '../../../../api-codegen/anapi';
import { CreateReportDialogComponent, CreateReportDialogData } from './create-report-dialog';
import { mapToShopInfo } from '../../operations/operators';
import { ShopService } from '../../../../api';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class PayoutPanelService {
    constructor(private dialog: MatDialog, private shopService: ShopService) {}

    getShopInfo(shopID: string) {
        return this.shopService.shops$.pipe(
            mapToShopInfo,
            map(shops => shops.find(shop => shop.shopID === shopID)),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    createReport({ payoutSummary, shopID }: Payout) {
        this.dialog.open<CreateReportDialogComponent, CreateReportDialogData>(CreateReportDialogComponent, {
            width: '560px',
            disableClose: true,
            data: {
                fromTime: moment
                    .min(payoutSummary.map(({ fromTime }) => moment(fromTime)))
                    .utc()
                    .format(),
                toTime: moment
                    .max(payoutSummary.map(({ toTime }) => moment(toTime)))
                    .utc()
                    .format(),
                shopID: shopID
            }
        });
    }
}
