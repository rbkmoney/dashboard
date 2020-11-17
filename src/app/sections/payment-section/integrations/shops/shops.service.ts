import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { isNil, TranslocoService } from '@ngneat/transloco';
import cloneDeep from 'lodash.clonedeep';
import { filter, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { Dict } from '@dsh/app/shared/interfaces';
import { ConfirmActionDialogComponent } from '@dsh/components/popups';

import { ShopService } from '../../../../api';
import { Shop } from '../../../../api-codegen/anapi/swagger-codegen';
import { progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';
import { filterShopsByRealm } from '../../operations/operators';
import { ShopBalance } from './shops-list/interfaces';
import { ShopsBalanceService } from './shops-list/services/shops-balance/shops-balance.service';

@Injectable()
export class ShopsService {
    shops$ = this.route.params.pipe(
        pluck('realm'),
        filterShopsByRealm(this.shopService.shops$),
        switchMap((shops: Shop[]) => {
            const shopIds = shops.map(({ id }) => id);
            this.shopsBalance.setShopIds(shopIds);
            return this.shopsBalance.balances$.pipe(
                map((balances: ShopBalance[]) => {
                    const balancesMap = balances.reduce((acc: Dict<ShopBalance>, el: ShopBalance) => {
                        acc[el.id] = cloneDeep(el);
                        return acc;
                    }, {});

                    return shops.map(({ id, ...shopData }) => {
                        const balance = balancesMap[id];
                        return {
                            id,
                            ...shopData,
                            balance: isNil(balance) ? null : balance.data,
                        };
                    });
                })
            );
        }),
        shareReplay(SHARE_REPLAY_CONF)
    );

    isLoading$ = progress(this.route.params, this.shops$).pipe(shareReplay(SHARE_REPLAY_CONF));

    constructor(
        private route: ActivatedRoute,
        private shopService: ShopService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        private shopsBalance: ShopsBalanceService
    ) {}

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
