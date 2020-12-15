import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { PaymentSearchService } from '@dsh/api/search';
import { ApiShopsService } from '@dsh/api/shop';
import { isNumber } from '@dsh/app/shared/utils';

import { toMinor } from '../../../../../../../../utils';
import { booleanDebounceTime } from '../../../../../../../custom-operators';
import { SEARCH_LIMIT } from '../../../../../../constants';
import { PartialFetcher } from '../../../../../../partial-fetcher';
import { mapToTimestamp } from '../../../../operators';
import { PaymentSearchFormValue } from '../../../search-form';
import { Payment } from '../../../types/payment';
import { DEBOUNCE_ACTION_TIME } from '../../consts';
import { formatPaymentsData } from '../../utils/format-payments-data';

// TODO: remove this disable after making partial fetcher with injectable debounce time
/* tslint:disable:no-unused-variable */
@Injectable()
export class FetchPaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    paymentsList$: Observable<Payment[]> = combineLatest([this.searchResult$, this.shopService.shops$]).pipe(
        formatPaymentsData
    );

    private realm$ = new ReplaySubject<PaymentInstitutionRealm>(1);

    constructor(
        private paymentSearchService: PaymentSearchService,
        private shopService: ApiShopsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        private searchLimit: number,
        @Inject(DEBOUNCE_ACTION_TIME)
        private debounceActionTime: number
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
