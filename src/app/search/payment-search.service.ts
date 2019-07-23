import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import moment from 'moment';

import { InlineResponse2001, SearchService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';

@Injectable()
export class PaymentSearchService {
    constructor(private searchService: SearchService) {}

    getPayment = (invoiceID: string, paymentID: string): Observable<InlineResponse2001> =>
        this.searchService.searchPayments(
            genXRequestID(),
            moment().subtract(1, 'year') as any,
            moment() as any,
            1,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            invoiceID,
            paymentID,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined
        );
}
