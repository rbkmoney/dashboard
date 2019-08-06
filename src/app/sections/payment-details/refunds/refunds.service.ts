import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { RefundSearchService } from '../../../search/refund-search.service';
import { RefundSearchResult } from '../../../api/capi/swagger-codegen';

@Injectable()
export class RefundsService {
    refunds = new Subject<RefundSearchResult[]>();

    totalCount = 0;

    offset = 0;

    constructor(private refundSearchService: RefundSearchService) {}

    loadRefunds(invoiceID: string, paymentID: string) {
        this.refundSearchService.searchRefunds(invoiceID, paymentID, this.offset).subscribe(refundsWithTotalCount => {
            this.totalCount = refundsWithTotalCount.totalCount;
            this.offset += refundsWithTotalCount.result.length;
            this.refunds.next(refundsWithTotalCount.result);
        });
    }

    isMoreRefundsAvailable(): boolean {
        return this.offset < this.totalCount;
    }

    isRefundsAvailable(): boolean {
        return this.totalCount > 0;
    }
}
