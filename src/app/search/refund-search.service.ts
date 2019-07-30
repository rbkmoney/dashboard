import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import moment from 'moment';

import { SearchService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';
import { RefundsWithTotalCount } from './refunds-with-total-count';

@Injectable()
export class RefundSearchService {
    constructor(private searchService: SearchService) {}

    getRefunds(
        invoiceID: string,
        paymentID: string,
        offset: number,
        limit = 1,
        fromTime = moment().subtract(1, 'M') as any,
        toTime = moment() as any
    ): Observable<RefundsWithTotalCount> {
        return this.searchService.searchRefunds(
            genXRequestID(),
            fromTime,
            toTime,
            limit,
            undefined,
            undefined,
            offset,
            invoiceID,
            paymentID,
            undefined,
            undefined,
            undefined,
            undefined
        );
    }
}
