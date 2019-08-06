import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { RefundSearchService } from '../../../search/refund-search.service';
import { RefundSearchResult } from '../../../api/capi/swagger-codegen';

@Injectable()
export class RefundsService {
    private refunds$ = new BehaviorSubject<RefundSearchResult[]>([]);

    private hasMoreRefunds$ = new BehaviorSubject<boolean>(false);

    private continuationToken: string;

    constructor(private refundSearchService: RefundSearchService) {}

    loadRefunds(invoiceID: string, paymentID: string) {
        this.refundSearchService.searchRefunds(invoiceID, paymentID, this.continuationToken).subscribe(refundsWithToken => {
            this.continuationToken = refundsWithToken.continuationToken;
            this.hasMoreRefunds$.next(!!refundsWithToken.continuationToken);
            this.refunds$.next(this.refunds$.getValue().concat(refundsWithToken.result));
        });
    }

    refunds(): Observable<RefundSearchResult[]> {
        return this.refunds$.asObservable();
    }

    hasMoreObservable(): Observable<boolean> {
        return this.hasMoreRefunds$.asObservable();
    }
}
