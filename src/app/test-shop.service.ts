import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, switchMapTo, filter, first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { CAPIClaimsService, ShopService, createTestShopClaimChangeset } from './api';

@Injectable()
export class TestShopService {
    private createTestShopWhenNoShops$ = new Subject();

    constructor(
        private capiClaimsService: CAPIClaimsService,
        private shopService: ShopService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.createTestShopWhenNoShops$
            .pipe(
                first(),
                switchMapTo(this.shopService.shops$),
                first(),
                filter(shops => shops.length === 0),
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
