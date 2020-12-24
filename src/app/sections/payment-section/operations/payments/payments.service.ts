import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable } from 'rxjs';
import { catchError, pluck, switchMap } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/capi';
import { PaymentSearchService } from '@dsh/api/search';
import { ApiShopsService } from '@dsh/api/shop';

import { toMinor } from '../../../../../utils';
import { mapToTimestamp } from '../../../../custom-operators';
import { FetchResult, PartialFetcher } from '../../../partial-fetcher';
import { mapToPaymentsTableData } from './map-to-payments-table-data';
import { PaymentSearchFormValue } from './search-form';
import { PaymentsTableData } from './table';

@Injectable()
export class PaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    private readonly searchLimit = 20;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);

    paymentsTableData$: Observable<PaymentsTableData[]> = combineLatest([
        this.searchResult$,
        this.shopService.shops$,
    ]).pipe(
        mapToPaymentsTableData,
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    constructor(
        private route: ActivatedRoute,
        private paymentSearchService: PaymentSearchService,
        private shopService: ApiShopsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        super();
    }

    protected fetch(
        { paymentAmountFrom, paymentAmountTo, date: { begin, end }, ...params }: PaymentSearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<PaymentSearchResult>> {
        return this.route.params.pipe(
            pluck('realm'),
            switchMap((paymentInstitutionRealm) =>
                this.paymentSearchService.searchPayments(
                    begin.utc().format(),
                    end.utc().format(),
                    {
                        ...params,
                        paymentInstitutionRealm,
                        paymentAmountFrom:
                            typeof paymentAmountFrom === 'number' ? toMinor(paymentAmountFrom) : undefined,
                        paymentAmountTo: typeof paymentAmountTo === 'number' ? toMinor(paymentAmountTo) : undefined,
                    },
                    this.searchLimit,
                    continuationToken
                )
            )
        );
    }
}
