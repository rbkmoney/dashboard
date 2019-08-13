import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { RefundSearchService } from '../../../search';
import { RefundSearchResult } from '../../../api/capi/swagger-codegen';

@Injectable()
export class RefundsService {
    private refunds$ = new BehaviorSubject<RefundSearchResult[]>([]);

    private hasMoreRefunds$ = new BehaviorSubject<boolean>(false);

    private continuationToken: string;

    constructor(private refundSearchService: RefundSearchService) {}

    loadRefunds(invoiceID: string, paymentID: string) {
        this.refundSearchService
            .searchRefundsByDuration({ amount: 1, unit: 'y' }, invoiceID, paymentID, 3, this.continuationToken)
            .subscribe(({ continuationToken, result }) => {
                this.continuationToken = continuationToken;
                this.hasMoreRefunds$.next(!!continuationToken);
                this.refunds$.next(this.refunds$.getValue().concat(result));
            });
    }

    refunds(): Observable<RefundSearchResult[]> {
        return this.refunds$.asObservable();
    }

    hasMoreRefunds(): Observable<boolean> {
        return this.hasMoreRefunds$.asObservable();
    }
}
