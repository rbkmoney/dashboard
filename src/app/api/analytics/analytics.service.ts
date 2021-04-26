import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AnalyticsService as APIAnalyticsService, InlineResponse200, SplitUnit } from '@dsh/api-codegen/anapi';
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
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getAveragePayment(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    partyID,
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
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsAmount(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    partyID,
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
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsCount(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    partyID,
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
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsErrorDistribution(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    partyID,
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
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsSubErrorDistribution(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    partyID,
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
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsToolDistribution(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    partyID,
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
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getRefundsAmount(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    undefined,
                    partyID,
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
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsSplitAmount(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    splitUnit,
                    undefined,
                    partyID,
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
    ) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getPaymentsSplitCount(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    splitUnit,
                    undefined,
                    partyID,
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
    }) {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.analyticsService.getCurrentBalances(
                    genXRequestID(),
                    undefined,
                    partyID,
                    params.shopIDs,
                    params.excludeShopIDs,
                    params.paymentInstitutionRealm
                )
            )
        );
    }

    getGroupBalances(params: { shopIDs?: string[]; excludeShopIDs?: string[] }): Observable<InlineResponse200> {
        return this.analyticsService.getCurrentBalancesGroupByShop(
            genXRequestID(),
            undefined,
            params.shopIDs,
            params.excludeShopIDs
        );
    }
}
