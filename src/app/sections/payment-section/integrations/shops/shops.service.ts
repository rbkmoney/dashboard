import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { isNil, TranslocoService } from '@ngneat/transloco';
import cloneDeep from 'lodash.clonedeep';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, pluck, shareReplay, skip, startWith, switchMap, tap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { Dict } from '../../../../../type-utils';
import { ShopService } from '../../../../api';
import { Shop } from '../../../../api-codegen/anapi/swagger-codegen';
import { progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { filterShopsByRealm, mapToTimestamp } from '../../operations/operators';
import { ShopBalance, ShopItem } from './interfaces';
import { ShopsBalanceService } from './services/shops-balance/shops-balance.service';

export const combineShopItem = (balances$: Observable<ShopBalance[]>) => (
    shops$: Observable<Shop[]>
): Observable<ShopItem[]> => {
    return shops$.pipe(
        switchMap((shops: Shop[]) => {
            return balances$.pipe(
                map((balances: ShopBalance[]) => {
                    const balancesMap = balances.reduce((acc: Dict<ShopBalance>, el: ShopBalance) => {
                        acc[el.id] = cloneDeep(el);
                        return acc;
                    }, {});

                    return shops
                        .map((shop: Shop) => {
                            const balance = balancesMap[shop.id];
                            return {
                                ...shop,
                                balance: isNil(balance) ? null : balance.data,
                            };
                        })
                        .map((shop: ShopItem) => cloneDeep(shop));
                })
            );
        })
    );
};

@Injectable()
export class ShopsService {
    shops$: Observable<ShopItem[]>;
    lastUpdated$: Observable<string>;
    isLoading$: Observable<boolean>;

    private refreshData$ = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private shopService: ShopService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private shopsBalance: ShopsBalanceService
    ) {
        const initLoadData$ = this.refreshData$.pipe(startWith<void, null>(null));

        this.shops$ = this.route.params.pipe(
            pluck('realm'),
            filterShopsByRealm(this.shopService.shops$),
            tap((shops: Shop[]) => {
                const shopIds = shops.map(({ id }) => id);
                this.shopsBalance.setShopIds(shopIds);
            }),
            combineShopItem(this.shopsBalance.balances$.pipe(distinctUntilChanged())),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.lastUpdated$ = this.shops$.pipe(mapToTimestamp, shareReplay(1));
        this.isLoading$ = progress(initLoadData$, this.shops$).pipe(shareReplay(SHARE_REPLAY_CONF));

        initLoadData$.pipe(skip(1)).subscribe(() => {
            this.shopService.reloadShops();
        });
    }

    refreshData(): void {
        this.refreshData$.next();
    }

    suspend(id: string) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopService.suspendShop(id))
            )
            .subscribe(
                () => {
                    this.snackBar.open(this.transloco.translate('suspend.success', null, 'shops'), 'OK', {
                        duration: 3000,
                    });
                    this.shopService.reloadShops();
                },
                () => this.snackBar.open(this.transloco.translate('suspend.error', null, 'shops'), 'OK')
            );
    }

    activate(id: string) {
        this.dialog
            .open(ConfirmActionDialogComponent)
            .afterClosed()
            .pipe(
                filter((r) => r === 'confirm'),
                switchMap(() => this.shopService.activateShop(id))
            )
            .subscribe(
                () => {
                    this.snackBar.open(this.transloco.translate('activate.success', null, 'shops'), 'OK', {
                        duration: 3000,
                    });
                    this.shopService.reloadShops();
                },
                () => this.snackBar.open(this.transloco.translate('activate.error', null, 'shops'), 'OK')
            );
    }
}
