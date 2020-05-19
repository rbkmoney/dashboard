import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { shareReplay } from 'rxjs/operators';

import { ShopService } from '../../../../api';
import { Payout } from '../../../../api-codegen/anapi';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { mapToShopInfo } from '../../operations/operators';
import { CreateReportDialogComponent, CreateReportDialogData } from './create-report-dialog';

@Injectable()
export class PayoutsPanelsListService {
    shopsInfo$ = this.shopService.shops$.pipe(mapToShopInfo, shareReplay(SHARE_REPLAY_CONF));

    constructor(private dialog: MatDialog, private shopService: ShopService) {}

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
                shopID,
            },
        });
    }
}
