import { Injectable } from '@angular/core';
import { concat, defer, forkJoin, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, first, mapTo, shareReplay, switchMap, tap } from 'rxjs/operators';

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
        switchMap(() =>
            concat(this.capiPartiesService.getMyParty(), this.initShop(), this.initOrganization()).pipe(
                mapTo(true),
                catchError((e) => {
                    this.errorService.error(e);
                    return of(false);
                })
            )
        ),
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
        return forkJoin([this.organizationsService.getOrganizations(1), this.userService.profile$.pipe(first())]).pipe(
            switchMap(([orgs, { username }]) =>
                orgs.results.length
                    ? of(null)
                    : this.organizationsService.createOrganization({
                          name: MAIN_ORGANIZATION_NAME,
                          owner: username as never,
                      })
            )
        );
    }

    private initShop(): Observable<boolean> {
        return this.shopService.shops$.pipe(
            first(),
            switchMap((shops) =>
                shops.length ? of(null) : this.createTestShop().pipe(tap(() => this.shopService.reloadShops()))
            )
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
