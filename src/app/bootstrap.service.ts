import { Injectable } from '@angular/core';
import { iif, Observable, of, ReplaySubject } from 'rxjs';
import { first, map, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { ApiShopsService, CAPIClaimsService, CAPIPartiesService, createTestShopClaimChangeset } from './api';

@Injectable()
export class BootstrapService {
    bootstrapped$: Observable<boolean>;

    private bootstrap$ = new ReplaySubject(1);

    constructor(
        private partiesService: CAPIPartiesService,
        private shopService: ApiShopsService,
        private capiClaimsService: CAPIClaimsService
    ) {
        this.bootstrapped$ = this.bootstrap$.pipe(
            first(),
            switchMapTo(this.partiesService.getMyParty()),
            switchMapTo(this.shopService.shops$.pipe(first())),
            switchMap((shops) =>
                iif(
                    () => shops.length === 0,
                    this.createTestShop().pipe(tap(() => this.shopService.reloadShops())),
                    of(true)
                )
            )
        );
    }

    bootstrap() {
        this.bootstrap$.next();
    }

    private createTestShop(): Observable<boolean> {
        return this.capiClaimsService.createClaim(createTestShopClaimChangeset()).pipe(map(() => true));
    }
}
