import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { RefundSearchResult } from '@dsh/api-codegen/capi';
import { RefundSearchService } from '@dsh/api/search';

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
            continuationToken
        );
    }

    createRefund(shopID: string, invoiceID: string, paymentID: string, maxRefundAmount: number, currency: string) {
        this.dialog
            .open(CreateRefundComponent, {
                data: {
                    shopID,
                    invoiceID,
                    paymentID,
                    currency,
                    maxRefundAmount,
                } as CreateRefundData,
                width: '450px',
                disableClose: true,
            })
            .afterClosed()
            .subscribe((success) => {
                if (success) {
                    this.refresh();
                }
            });
    }
}
