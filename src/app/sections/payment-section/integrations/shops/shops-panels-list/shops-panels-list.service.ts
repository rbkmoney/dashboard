import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, concat, ReplaySubject, Subject } from 'rxjs';
import { filter, first, map, mapTo, pluck, scan, shareReplay, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ShopService } from '../../../../../api';
import { Shop } from '../../../../../api-codegen/capi';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';

const SHOPS_LIMIT = 10;

@Injectable()
export class ShopsPanelsListService {
    private allShops$ = new ReplaySubject<Shop[]>(1);
    private showMore$ = new Subject<void>();

    selectedPanelPosition$ = combineLatest([this.route.fragment, this.allShops$]).pipe(
        first(),
        map(([fragment, shops]) => shops.findIndex(({ id }) => id === fragment)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    private offset$ = concat(
        this.selectedPanelPosition$.pipe(map(idx => this.getOffsetBySelectedPanelPosition(idx))),
        this.showMore$.pipe(mapTo(SHOPS_LIMIT))
    ).pipe(
        scan((offset, limit) => offset + limit, 0),
        shareReplay(SHARE_REPLAY_CONF)
    );

    shops$ = combineLatest([this.allShops$, this.offset$]).pipe(
        map(([shops, showedCount]) => shops.slice(0, showedCount)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasMore$ = combineLatest([this.allShops$.pipe(pluck('length')), this.offset$]).pipe(
        map(([count, showedCount]) => count > showedCount),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private dialog: MatDialog,
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    select(idx: number) {
        this.allShops$.pipe(pluck(idx, 'id')).subscribe(fragment => {
            this.router.navigate([], { fragment, queryParams: this.route.snapshot.queryParams });
        });
    }

    suspend(id: string) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter(r => r === 'confirm'),
                switchMap(() => this.shopService.suspendShop(id))
            )
            .subscribe(
                () => {
                    this.snackBar.open(this.transloco.translate('suspend.success', null, 'shops|scoped'), 'OK', {
                        duration: 3000
                    });
                    this.shopService.reloadShops();
                },
                () => this.snackBar.open(this.transloco.translate('suspend.error', null, 'shops|scoped'), 'OK')
            );
    }

    activate(id: string) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter(r => r === 'confirm'),
                switchMap(() => this.shopService.activateShop(id))
            )
            .subscribe(
                () => {
                    this.snackBar.open(this.transloco.translate('activate.success', null, 'shops|scoped'), 'OK', {
                        duration: 3000
                    });
                    this.shopService.reloadShops();
                },
                () => this.snackBar.open(this.transloco.translate('activate.error', null, 'shops|scoped'), 'OK')
            );
    }

    showMore() {
        this.showMore$.next();
    }

    updateShops(shops: Shop[]) {
        this.allShops$.next(shops);
    }

    private getOffsetBySelectedPanelPosition(idx: number) {
        if (idx === -1) {
            return SHOPS_LIMIT;
        }
        return Math.ceil((idx + 1) / SHOPS_LIMIT) * SHOPS_LIMIT;
    }
}
