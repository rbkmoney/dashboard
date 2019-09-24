import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { RefundsSearchFormValue } from './search-form';
import { RefundSearchService } from '../../../../api/search';
import { RefundSearchResult } from '../../../../api-codegen/capi';
import { PartialFetcher, FetchResult } from '../../../partial-fetcher';
import { RefundsTableData } from './table';
import { mapToTimestamp } from '../operators';
import { booleanDelay } from '../../../../custom-operators';
import { LocaleDictionaryService } from '../../../../locale';

@Injectable()
export class RefundsService extends PartialFetcher<RefundSearchResult, RefundsSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    refundsTableData$: Observable<RefundsTableData[]> = this.searchResult$.pipe(
        catchError(() => {
            this.snackBar.open(this.dicService.mapDictionaryKey('common.httpError'), 'OK');
            return [];
        })
    );

    isLoading$: Observable<boolean> = this.searchResult$.pipe(
        booleanDelay(500, this.doAction$),
        shareReplay(1)
    );

    constructor(
        private refundSearchService: RefundSearchService,
        private snackBar: MatSnackBar,
        private dicService: LocaleDictionaryService
    ) {
        super();
    }

    protected fetch(
        params: RefundsSearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<RefundSearchResult>> {
        return this.refundSearchService.searchRefunds(
            params.fromTime.utc().format(),
            params.toTime.utc().format(),
            params.invoiceID,
            params.paymentID,
            this.searchLimit,
            continuationToken
        );
    }
}
