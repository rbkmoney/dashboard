import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AnalyticsService as APIAnalyticsService, InlineResponse200, SplitUnit } from '../../api-codegen/anapi';
import { PaymentInstitutionRealm } from '../model';
import { genXRequestID, toDateLike } from '../utils';

@Injectable()
export class AnalyticsService {
    constructor(private analyticsService: APIAnalyticsService) {}

    getAveragePayment(
        fromTime: string,
        toTime: string,
        params: {
            shopIDs?: string[];
            excludeShopIDs?: string[];
            paymentInstitutionRealm?: PaymentInstitutionRealm;
        }
    ) {
        return this.analyticsService.getAveragePayment(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
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
        return this.analyticsService.getPaymentsAmount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
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
        return this.analyticsService.getPaymentsCount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
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
        return this.analyticsService.getPaymentsErrorDistribution(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
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
        return this.analyticsService.getPaymentsSubErrorDistribution(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
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
        return this.analyticsService.getPaymentsToolDistribution(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
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
        return this.analyticsService.getRefundsAmount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
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
        return this.analyticsService.getPaymentsSplitAmount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            splitUnit,
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
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
        return this.analyticsService.getPaymentsSplitCount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            splitUnit,
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
        );
    }

    getCurrentBalances(params: {
        shopIDs?: string[];
        excludeShopIDs?: string[];
        paymentInstitutionRealm?: PaymentInstitutionRealm;
    }) {
        return this.analyticsService.getCurrentBalances(
            genXRequestID(),
            undefined,
            undefined,
            params.shopIDs,
            params.excludeShopIDs,
            params.paymentInstitutionRealm
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
