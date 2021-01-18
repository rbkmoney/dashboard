import { Injectable } from '@angular/core';
import { defer, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, first, mapTo, shareReplay, switchMap, tap } from 'rxjs/operators';

import { ApiShopsService, ClaimsService } from './api';
import { createTestShopModifications } from './api/claims/claim-party-modification/create-test-shop-modifications/create-test-shop-modifications';
import { ErrorService } from './shared';
import { UuidGeneratorService } from './shared/services/uuid-generator/uuid-generator.service';

@Injectable()
export class BootstrapService {
    bootstrapped$: Observable<boolean> = defer(() => this.bootstrap$).pipe(
        switchMap(() => this.bootstrapShop()),
        shareReplay(1)
    );

    private bootstrap$ = new ReplaySubject<void>(1);

    constructor(
        private shopService: ApiShopsService,
        private claimsService: ClaimsService,
        private idGeneratorService: UuidGeneratorService,
        private errorService: ErrorService
    ) {}

    bootstrap() {
        this.bootstrap$.next();
    }

    private bootstrapShop() {
        return this.shopService.shops$.pipe(
            first(),
            switchMap((shops) =>
                shops.length
                    ? of(true)
                    : this.createTestShop().pipe(
                          mapTo(true),
                          tap(() => this.shopService.reloadShops())
                      )
            ),
            catchError((e) => (this.errorService.error(e), of(false)))
        );
    }

    private createTestShop() {
        return this.claimsService.createClaim(
            createTestShopModifications({
                contractorID: this.idGeneratorService.generateUUID(),
                contractID: this.idGeneratorService.generateUUID(),
                shopID: this.idGeneratorService.generateUUID(),
                payoutToolID: this.idGeneratorService.generateUUID(),
            })
        );
    }
}
