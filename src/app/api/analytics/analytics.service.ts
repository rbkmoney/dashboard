import { Injectable } from '@angular/core';

import { AnalyticsService as APIAnalyticsService, SplitUnit } from '../../api-codegen/anapi';
import { genXRequestID, toDateLike } from '../utils';

@Injectable()
export class AnalyticsService {
    constructor(private analyticsService: APIAnalyticsService) {}

    getAveragePayment(fromTime: string, toTime: string, shopIDs?: Array<string>) {
        return this.analyticsService.getAveragePayment(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            shopIDs
        );
    }

    getPaymentsAmount(fromTime: string, toTime: string, shopIDs?: Array<string>) {
        return this.analyticsService.getPaymentsAmount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            shopIDs
        );
    }

    getPaymentsCount(fromTime: string, toTime: string, shopIDs?: Array<string>) {
        return this.analyticsService.getPaymentsCount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            shopIDs
        );
    }

    getPaymentsErrorDistribution(fromTime: string, toTime: string, shopIDs?: Array<string>) {
        return this.analyticsService.getPaymentsErrorDistribution(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            shopIDs
        );
    }

    getPaymentsSubErrorDistribution(fromTime: string, toTime: string, shopIDs?: Array<string>) {
        return this.analyticsService.getPaymentsSubErrorDistribution(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            shopIDs
        );
    }

    getPaymentsToolDistribution(fromTime: string, toTime: string, shopIDs?: Array<string>) {
        return this.analyticsService.getPaymentsToolDistribution(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            shopIDs
        );
    }

    getRefundsAmount(fromTime: string, toTime: string, shopIDs?: Array<string>) {
        return this.analyticsService.getRefundsAmount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            undefined,
            shopIDs
        );
    }

    getPaymentsSplitAmount(fromTime: string, toTime: string, splitUnit: SplitUnit, shopIDs?: Array<string>) {
        return this.analyticsService.getPaymentsSplitAmount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            splitUnit,
            undefined,
            shopIDs
        );
    }

    getPaymentsSplitCount(fromTime: string, toTime: string, splitUnit: SplitUnit, shopIDs?: Array<string>) {
        return this.analyticsService.getPaymentsSplitCount(
            genXRequestID(),
            toDateLike(fromTime),
            toDateLike(toTime),
            splitUnit,
            undefined,
            shopIDs
        );
    }
}
