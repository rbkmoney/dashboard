import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';
import { combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, switchMap } from 'rxjs/operators';

import { ShopService } from '../../../../api';
import { Payout } from '../../../../api-codegen/anapi';
import { SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { mapToShopInfo, ShopInfo } from '../../operations/operators';
import { CreateReportDialogComponent, CreateReportDialogData } from './create-report-dialog';

@Injectable()
export class PayoutPanelService implements OnDestroy {
    private getShopInfo$ = new Subject<string>();
    private subscription: Subscription = Subscription.EMPTY;

    shopInfo$: Observable<ShopInfo> = this.getShopInfo$.pipe(
        distinctUntilChanged(),
        switchMap(shopID => combineLatest(of(shopID), this.shopService.shops$.pipe(mapToShopInfo))),
        map(([shopID, shops]) => shops.find(shop => shop.shopID === shopID)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private dialog: MatDialog, private shopService: ShopService) {
        this.subscription = this.shopInfo$.subscribe();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getShopInfo(shopID: string) {
        this.getShopInfo$.next(shopID);
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
                shopID
            }
        });
    }
}
