import { Injectable } from '@angular/core';

import { AnalyticsService as APIAnalyticsService, SplitUnit } from '../../api-codegen/anapi';
import { genXRequestID } from '../utils';

@Injectable()
export class AnalyticsService {
    constructor(private analyticsService: APIAnalyticsService) {}

    getAveragePayment(fromTime: Date, toTime: Date, shopIDs?: Array<string>) {
        return this.analyticsService.getAveragePayment(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getPaymentsAmount(fromTime: Date, toTime: Date, shopIDs?: Array<string>) {
        return this.analyticsService.getPaymentsAmount(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getPaymentsCount(fromTime: Date, toTime: Date, shopIDs?: Array<string>) {
        return this.analyticsService.getPaymentsCount(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getPaymentsErrorDistribution(
        fromTime: Date,
        toTime: Date,
        shopIDs?: Array<string>
    ) {
        return this.analyticsService.getPaymentsErrorDistribution(
            genXRequestID(),
            fromTime,
            toTime,
            undefined,
            shopIDs
        );
    }

    getPaymentsToolDistribution(
        fromTime: Date,
        toTime: Date,
        shopIDs?: Array<string>
    ) {
        return this.analyticsService.getPaymentsToolDistribution(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getRefundsAmount(fromTime: Date, toTime: Date, shopIDs?: Array<string>) {
        return this.analyticsService.getRefundsAmount(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getPaymentsSplitAmount(
        fromTime: Date,
        toTime: Date,
        splitUnit: SplitUnit,
        shopIDs?: Array<string>
    ) {
        return this.analyticsService.getPaymentsSplitAmount(
            genXRequestID(),
            fromTime,
            toTime,
            splitUnit,
            undefined,
            shopIDs
        );
    }

    getPaymentsSplitCount(
        fromTime: Date,
        toTime: Date,
        splitUnit: SplitUnit,
        shopIDs?: Array<string>
    ) {
        return this.analyticsService.getPaymentsSplitCount(
            genXRequestID(),
            fromTime,
            toTime,
            splitUnit,
            undefined,
            shopIDs
        );
    }
}
