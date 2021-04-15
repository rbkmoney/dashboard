import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { DEBOUNCE_FETCHER_ACTION_TIME, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { PaymentSearchService } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { isNumber } from '@dsh/app/shared/utils';
import { toMinor } from '@dsh/utils';

import { PaymentSearchFormValue } from '../../types/payment-search-form-value';

@Injectable()
export class FetchPaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    paymentsList$: Observable<PaymentSearchResult[]> = this.searchResult$;

    private realm$ = new ReplaySubject<PaymentInstitutionRealm>(1);

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

    initRealm(realm: PaymentInstitutionRealm): void {
        this.realm$.next(realm);
    }

    protected fetch(
        { paymentAmountFrom, paymentAmountTo, date: { begin, end }, ...params }: PaymentSearchFormValue,
        continuationToken?: string
    ) {
        return this.realm$.pipe(
            switchMap((realm: PaymentInstitutionRealm) => {
                return this.paymentSearchService
                    .searchPayments(
                        begin.utc().format(),
                        end.utc().format(),
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
            })
        );
    }
}
