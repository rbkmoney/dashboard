import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import moment from 'moment';

import { SearchService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';
import { RefundsWithTotalCount } from './refunds-with-total-count';
import { fakeDate } from './fake-date';

@Injectable()
export class RefundSearchService {
    constructor(private searchService: SearchService) {}

    searchRefunds(
        invoiceID: string,
        paymentID: string,
        continuationToken: string,
        limit = 1,
        fromTime = moment().subtract(1, 'M').utc().format(),
        toTime = moment().utc().format()
    ): Observable<RefundsWithTotalCount> {
        return this.searchService.searchRefunds(
            genXRequestID(),
            fakeDate(fromTime),
            fakeDate(toTime),
            limit,
            undefined,
            undefined,
            undefined,
            invoiceID,
            paymentID,
            undefined,
            undefined,
            undefined,
            continuationToken
        );
    }
}
