import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { RefundSearchResult } from '../../../api-codegen/capi';
import { RefundSearchService } from '../../../api/search';
import { FetchResult, PartialFetcher } from '../../partial-fetcher';
import { CreateRefundComponent, CreateRefundData } from './create-refund';
import { RefundsSearchParams } from './refunds-search-params';

@Injectable()
export class RefundsService extends PartialFetcher<RefundSearchResult, RefundsSearchParams> {
    private readonly searchLimit = 3;

    constructor(private refundSearchService: RefundSearchService, private dialog: MatDialog) {
        super();
    }

    protected fetch(
        { invoiceID, paymentID }: RefundsSearchParams,
        continuationToken: string
    ): Observable<FetchResult<RefundSearchResult>> {
        return this.refundSearchService.searchRefundsByDuration(
            { amount: 3, unit: 'y' },
            {
                invoiceID,
                paymentID,
            },
            this.searchLimit,
            undefined,
            continuationToken
        );
    }

    createRefund(shopID: string, invoiceID: string, paymentID: string, maxRefundAmount: number) {
        this.dialog.open(CreateRefundComponent, {
            data: {
                shopID,
                invoiceID,
                paymentID,
                maxRefundAmount,
            } as CreateRefundData,
            width: '450px',
            disableClose: true,
        });
    }
}
