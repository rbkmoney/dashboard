import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
    AnalyticsService as APIAnalyticsService,
    InlineResponse200,
    InlineResponse2001,
    InlineResponse2002,
    InlineResponse2003,
    InlineResponse2004,
    InlineResponse2005,
    SplitUnit
} from '../../api-codegen/anapi';
import { genXRequestID } from '../utils';

export type AveragePayment = InlineResponse200;
export type PaymentsAmount = InlineResponse200;
export type RefundsAmount = InlineResponse200;
export type PaymentsCount = InlineResponse2002;
export type PaymentsErrorDistribution = InlineResponse2003;
export type PaymentsToolDistribution = InlineResponse2001;
export type PaymentsSplitAmount = InlineResponse2004;
export type PaymentsSplitCount = InlineResponse2005;

@Injectable()
export class AnalyticsService {
    constructor(private analyticsService: APIAnalyticsService) {}

    getAveragePayment(fromTime: Date, toTime: Date, shopIDs?: Array<string>): Observable<AveragePayment> {
        return this.analyticsService.getAveragePayment(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getPaymentsAmount(fromTime: Date, toTime: Date, shopIDs?: Array<string>): Observable<PaymentsAmount> {
        return this.analyticsService.getPaymentsAmount(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getPaymentsCount(fromTime: Date, toTime: Date, shopIDs?: Array<string>): Observable<PaymentsCount> {
        return this.analyticsService.getPaymentsCount(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getPaymentsErrorDistribution(fromTime: Date, toTime: Date, shopIDs?: Array<string>): Observable<PaymentsErrorDistribution> {
        return this.analyticsService.getPaymentsErrorDistribution(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getPaymentsToolDistribution(fromTime: Date, toTime: Date, shopIDs?: Array<string>): Observable<PaymentsToolDistribution> {
        return this.analyticsService.getPaymentsToolDistribution(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getRefundsAmount(fromTime: Date, toTime: Date, shopIDs?: Array<string>): Observable<RefundsAmount> {
        return this.analyticsService.getRefundsAmount(genXRequestID(), fromTime, toTime, undefined, shopIDs);
    }

    getPaymentsSplitAmount(fromTime: Date, toTime: Date, splitUnit: SplitUnit, shopIDs?: Array<string>): Observable<PaymentsSplitAmount> {
        return this.analyticsService.getPaymentsSplitAmount(genXRequestID(), fromTime, toTime, splitUnit, undefined, shopIDs);
    }

    getPaymentsSplitCount(fromTime: Date, toTime: Date, splitUnit: SplitUnit, shopIDs?: Array<string>): Observable<PaymentsSplitCount> {
        return this.analyticsService.getPaymentsSplitCount(genXRequestID(), fromTime, toTime, splitUnit, undefined, shopIDs);
    }

}
