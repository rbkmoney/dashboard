import { Injectable } from '@angular/core';
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
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';

import { PaymentInstitutionRealm } from '../model';
import { genXRequestID, toDateLike } from '../utils';

@Injectable()
export class AnalyticsService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private analyticsService: APIAnalyticsService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {}

    getAveragePayment(
        fromTime: string,
        toTime: string,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ): Observable<InlineResponse2001> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getAveragePayment(
                    genXRequestID(),
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
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ): Observable<InlineResponse2001> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsAmount(
                    genXRequestID(),
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
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ): Observable<InlineResponse2003> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsCount(
                    genXRequestID(),
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
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ): Observable<InlineResponse2004> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsErrorDistribution(
                    genXRequestID(),
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
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ): Observable<InlineResponse2007> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsSubErrorDistribution(
                    genXRequestID(),
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
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ): Observable<InlineResponse2002> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsToolDistribution(
                    genXRequestID(),
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
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ): Observable<InlineResponse2001> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getRefundsAmount(
                    genXRequestID(),
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
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ): Observable<InlineResponse2005> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsSplitAmount(
                    genXRequestID(),
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
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ): Observable<InlineResponse2006> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsSplitCount(
                    genXRequestID(),
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
        paymentInstitutionRealm?: PaymentInstitutionRealm;
    }): Observable<InlineResponse2001> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getCurrentBalances(
                    genXRequestID(),
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
                    genXRequestID(),
                    partyID,
                    undefined,
                    params.shopIDs,
                    params.excludeShopIDs
                )
            )
        );
    }
}
