import { Injectable } from '@angular/core';
import { defer, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, first, mapTo, shareReplay, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import {
    ApiShopsService,
    CAPIPartiesService,
    ClaimsService,
    MAIN_ORGANIZATION_NAME,
    OrganizationsService,
} from './api';
import { createTestShopModifications } from './api/claims/claim-party-modification/create-test-shop-modifications/create-test-shop-modifications';
import { ErrorService, UserService } from './shared';
import { UuidGeneratorService } from './shared/services/uuid-generator/uuid-generator.service';

@Injectable()
export class BootstrapService {
    bootstrapped$: Observable<boolean> = defer(() => this.bootstrap$).pipe(
        switchMap(() => this.capiPartiesService.getMyParty()),
        switchMap(() => this.initShop()),
        switchMap(() => this.initOrganization()),
        shareReplay(1)
    );

    private bootstrap$ = new ReplaySubject<void>(1);

    constructor(
        private shopService: ApiShopsService,
        private claimsService: ClaimsService,
        private capiPartiesService: CAPIPartiesService,
        private idGeneratorService: UuidGeneratorService,
        private errorService: ErrorService,
        private organizationsService: OrganizationsService,
        private userService: UserService
    ) {}

    bootstrap() {
        this.bootstrap$.next();
    }

    private initOrganization(): Observable<boolean> {
        return this.organizationsService.getOrganizations(1).pipe(
            withLatestFrom(this.userService.profile$),
            switchMap(([orgs, { username }]) =>
                orgs.results.length
                    ? of(null)
                    : this.organizationsService.createOrganization({
                          name: MAIN_ORGANIZATION_NAME,
                          owner: username as never,
                      })
            ),
            mapTo(true),
            catchError((e) => (this.errorService.error(e), of(false)))
        );
    }

    private initShop(): Observable<boolean> {
        return this.shopService.shops$.pipe(
            first(),
            switchMap((shops) =>
                shops.length ? of(null) : this.createTestShop().pipe(tap(() => this.shopService.reloadShops()))
            ),
            mapTo(true),
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
