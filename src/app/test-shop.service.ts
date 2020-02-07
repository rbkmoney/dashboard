import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, switchMapTo, filter, first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { TranslocoService } from '@ngneat/transloco';

import { CAPIClaimsService, ShopService } from './api';

@Injectable()
export class TestShopService {
    private initTestShop$ = new Subject();

    constructor(
        private capiClaimsService: CAPIClaimsService,
        private shopService: ShopService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        this.initTestShop$
            .pipe(
                first(),
                switchMapTo(this.shopService.shops$),
                first(),
                filter(shops => shops.length === 0),
                switchMap(() => this.capiClaimsService.createTestShop())
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

    initTestShop(): void {
        this.initTestShop$.next();
    }
}
