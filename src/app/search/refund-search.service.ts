import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import moment from 'moment';

import { InlineResponse2003, SearchService } from '../api/capi/swagger-codegen';
import { genXRequestID } from '../api/gen-x-request-id';

@Injectable()
export class RefundSearchService {
    constructor(private searchService: SearchService) {}

    getRefunds = (invoiceID: string, paymentID: string, offset: number): Observable<InlineResponse2003> =>
        this.searchService.searchRefunds(
            genXRequestID(),
            moment().subtract(1, 'year') as any,
            moment() as any,
            3,
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
