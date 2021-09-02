import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {
    AnalyticsService as APIAnalyticsService,
    InlineResponse200,
    InlineResponse2001,
    InlineResponse2002,
    InlineResponse2003,
    InlineResponse2004,
    InlineResponse2005,
    InlineResponse2006,
    InlineResponse2007,
    SplitUnit,
} from '@dsh/api-codegen/anapi';
import { PaymentInstitution } from '@dsh/api-codegen/capi';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';

import { toDateLike } from '../utils';

import RealmEnum = PaymentInstitution.RealmEnum;

@Injectable()
export class AnalyticsService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private analyticsService: APIAnalyticsService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private idGenerator: IdGeneratorService
    ) {}

    getAveragePayment(
        fromTime: string,
        toTime: string,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: RealmEnum;
        }
    ): Observable<InlineResponse2001> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getAveragePayment(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getPaymentsAmount(
        fromTime: string,
        toTime: string,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: RealmEnum;
        }
    ): Observable<InlineResponse2001> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsAmount(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getPaymentsCount(
        fromTime: string,
        toTime: string,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: RealmEnum;
        }
    ): Observable<InlineResponse2003> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsCount(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getPaymentsErrorDistribution(
        fromTime: string,
        toTime: string,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: RealmEnum;
        }
    ): Observable<InlineResponse2004> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsErrorDistribution(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getPaymentsSubErrorDistribution(
        fromTime: string,
        toTime: string,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: RealmEnum;
        }
    ): Observable<InlineResponse2007> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsSubErrorDistribution(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getPaymentsToolDistribution(
        fromTime: string,
        toTime: string,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: RealmEnum;
        }
    ): Observable<InlineResponse2002> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsToolDistribution(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getRefundsAmount(
        fromTime: string,
        toTime: string,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: RealmEnum;
        }
    ): Observable<InlineResponse2001> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getRefundsAmount(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getPaymentsSplitAmount(
        fromTime: string,
        toTime: string,
        splitUnit: SplitUnit,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: RealmEnum;
        }
    ): Observable<InlineResponse2005> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsSplitAmount(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    splitUnit,
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getPaymentsSplitCount(
        fromTime: string,
        toTime: string,
        splitUnit: SplitUnit,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: RealmEnum;
        }
    ): Observable<InlineResponse2006> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsSplitCount(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    splitUnit,
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getCurrentBalances(params: {
        shopIDs?: string[];
        excludeShopIDs?: string[];
        paymentInstitutionRealm?: RealmEnum;
    }): Observable<InlineResponse2001> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getCurrentBalances(
                    this.idGenerator.shortUuid(),
                    partyID,
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getGroupBalances(params: { shopIDs?: string[]; excludeShopIDs?: string[] }): Observable<InlineResponse200> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getCurrentBalancesGroupByShop(
                    this.idGenerator.shortUuid(),
                    partyID,
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs
                )
            )
        );
    }
}
