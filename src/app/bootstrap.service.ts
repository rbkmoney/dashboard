import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { combineLatest, concat, defer, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, first, mapTo, shareReplay, switchMap, switchMapTo, takeLast, tap } from 'rxjs/operators';

import {
    ApiShopsService,
    CAPIClaimsService,
    CAPIPartiesService,
    createTestShopClaimChangeset,
    DEFAULT_ORGANIZATION_NAME,
    OrganizationsService,
} from '@dsh/api';
import { Claim } from '@dsh/api-codegen/capi';
import { Organization } from '@dsh/api-codegen/organizations';
import { ErrorService, UserService } from '@dsh/app/shared';

@UntilDestroy()
@Injectable()
export class BootstrapService {
    bootstrapped$: Observable<boolean> = defer(() => this.bootstrap$).pipe(
        switchMapTo(this.getBootstrapped()),
        untilDestroyed(this),
        shareReplay(1)
    );

    private bootstrap$ = new ReplaySubject<void>(1);

    constructor(
        private shopService: ApiShopsService,
        private capiClaimsService: CAPIClaimsService,
        private capiPartiesService: CAPIPartiesService,
        private errorService: ErrorService,
        private organizationsService: OrganizationsService,
        private userService: UserService,
        private transloco: TranslocoService
    ) {}

    bootstrap() {
        this.bootstrap$.next();
    }

    private getBootstrapped(): Observable<boolean> {
        return concat(this.capiPartiesService.getMyParty(), this.initOrganization(), this.initShop()).pipe(
            takeLast(1),
            mapTo(true),
            catchError((err) => {
                this.errorService.error(err, this.transloco.translate('errors.bootstrapAppFailed'));
                return of(false);
            })
        );
    }

    private initOrganization(): Observable<Organization | null> {
        return combineLatest([this.organizationsService.listOrgMembership(1), this.userService.id$]).pipe(
            first(),
            switchMap(([orgs, id]) => (orgs.results.length ? of(null) : this.createOrganization(id)))
        );
    }

    private createOrganization(id: Organization['id']): Observable<Organization> {
        return this.organizationsService.createOrg({
            name: DEFAULT_ORGANIZATION_NAME,
            owner: id as never,
        });
    }

    private initShop(): Observable<Claim | null> {
        return this.shopService.shops$.pipe(
            first(),
            switchMap((shops) =>
                shops.length ? of(null) : this.createTestShop().pipe(tap(() => this.shopService.reloadShops()))
            )
        );
    }

    private createTestShop(): Observable<Claim> {
        return this.capiClaimsService.createClaim(createTestShopClaimChangeset());
    }
}
