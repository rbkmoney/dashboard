import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Subject } from 'rxjs';
import { filter, first, switchMap, switchMapTo } from 'rxjs/operators';

import { ApiShopsService, CAPIClaimsService, createTestShopClaimChangeset } from './api';

@Injectable()
export class TestShopService {
    private createTestShopWhenNoShops$ = new Subject();

    constructor(
        private capiClaimsService: CAPIClaimsService,
        private shopService: ApiShopsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.createTestShopWhenNoShops$
            .pipe(
                first(),
                switchMapTo(this.shopService.shops$),
                first(),
                filter((shops) => shops.length === 0),
                switchMap(() => this.createTestShop())
            )
            .subscribe(
                () => {
                    this.shopService.reloadShops();
                },
                () => {
                    this.snackBar.open(this.transloco.translate('commonError'), 'OK');
                }
            );
    }

    private createTestShop() {
        return this.capiClaimsService.createClaim(createTestShopClaimChangeset());
    }

    createTestShopWhenNoShops(): void {
        this.createTestShopWhenNoShops$.next();
    }
}
