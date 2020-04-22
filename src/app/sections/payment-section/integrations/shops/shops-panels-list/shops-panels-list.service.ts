import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, first, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ShopService } from '../../../../../api';
import { SHARE_REPLAY_CONF } from '../../../../../custom-operators';
import { ShopsService } from '../shops.service';

const SHOPS_LIMIT = 10;

@Injectable()
export class ShopsPanelsListService {
    private showedCount$ = new BehaviorSubject(SHOPS_LIMIT);

    selectedIdx$ = combineLatest([this.route.fragment, this.shopsService.shops$]).pipe(
        first(),
        map(([fragment, shops]) => shops.findIndex(({ id }) => id === fragment)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    shops$ = combineLatest([this.shopService.shops$, this.showedCount$]).pipe(
        map(([shops, showedCount]) => shops.slice(0, showedCount)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    hasMore$ = combineLatest([this.shopService.shops$.pipe(pluck('length')), this.showedCount$]).pipe(
        map(([count, showedCount]) => count > showedCount),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(
        private dialog: MatDialog,
        private shopsService: ShopsService,
        private route: ActivatedRoute,
        private router: Router,
        private shopService: ShopService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {}

    select(idx: number) {
        this.shopsService.shops$.pipe(pluck(idx, 'id')).subscribe(fragment => {
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
        this.showedCount$.next(this.showedCount$.value + SHOPS_LIMIT);
    }
}
