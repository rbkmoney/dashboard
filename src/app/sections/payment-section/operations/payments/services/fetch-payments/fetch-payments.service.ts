import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable, of } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { PaymentsAndContinuationToken, PaymentSearchService } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { isNumber } from '@dsh/app/shared/utils';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';
import { toMinor } from '@dsh/utils';

import { PaymentSearchFormValue } from '../../types';

@Injectable()
export class FetchPaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));
    paymentsList$: Observable<PaymentSearchResult[]> = this.searchResult$;

    constructor(
        private paymentSearchService: PaymentSearchService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        debounceActionTime: number
    ) {
        super(debounceActionTime);
    }

    protected fetch(
        { paymentAmountFrom, paymentAmountTo, fromTime, toTime, realm, ...params }: PaymentSearchFormValue,
        continuationToken?: string
    ): Observable<PaymentsAndContinuationToken> {
        return this.paymentSearchService
            .searchPayments(
                fromTime,
                toTime,
                {
                    ...params,
                    paymentInstitutionRealm: realm,
                    paymentAmountFrom: isNumber(paymentAmountFrom) ? toMinor(paymentAmountFrom) : undefined,
                    paymentAmountTo: isNumber(paymentAmountTo) ? toMinor(paymentAmountTo) : undefined,
                },
                this.searchLimit,
                continuationToken
            )
            .pipe(
                catchError(() => {
                    this.snackBar.open(this.transloco.translate('httpError'), 'OK');
                    return of({ result: [] });
                })
            );
    }
}
