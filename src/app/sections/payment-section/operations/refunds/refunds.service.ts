import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { catchError, pluck, switchMap, withLatestFrom } from 'rxjs/operators';

import { RefundSearchResult } from '../../../../api-codegen/capi';
import { RefundSearchService } from '../../../../api/search';
import { ShopService } from '../../../../api/shop';
import { getId, getPaymentInstitutionRealm } from '../../../../shared/utils';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { mapToTimestamp } from '../operators';
import { mapToRefundsTableData } from './map-to-refunds-table-data';
import { RefundsSearchFormValue } from './search-form';
import { RefundsTableData } from './table';

@Injectable()
export class RefundsService extends PartialFetcher<RefundSearchResult, RefundsSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    refundsTableData$: Observable<RefundsTableData[]> = combineLatest([
        this.searchResult$,
        this.shopService.shops$,
    ]).pipe(
        mapToRefundsTableData,
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    constructor(
        private route: ActivatedRoute,
        private refundSearchService: RefundSearchService,
        private snackBar: MatSnackBar,
        private shopService: ShopService,
        private transloco: TranslocoService
    ) {
        super();
    }

    protected fetch(
        params: RefundsSearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<RefundSearchResult>> {
        return this.route.params.pipe(
            pluck('envID'),
            withLatestFrom(this.shopService.shops$),
            switchMap(([env, shops]) =>
                this.refundSearchService.searchRefunds(
                    params.date.begin.utc().format(),
                    params.date.end.utc().format(),
                    {
                        ...params,
                        paymentInstitutionRealm: getPaymentInstitutionRealm(env),
                        shopIDs: shops ? shops.map(getId) : params.shopIDs,
                    },
                    this.searchLimit,
                    continuationToken
                )
            )
        );
    }
}
