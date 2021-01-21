import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, pairwise, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { PaymentSearchService } from '@dsh/api/search';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { isNumber } from '@dsh/app/shared/utils';
import { SHARE_REPLAY_CONF } from '@dsh/operators';
import { toMinor } from '@dsh/utils';

import { DEBOUNCE_FETCHER_ACTION_TIME, IndicatorsPartialFetcher } from '../../../../../partial-fetcher';
import { PaymentSearchFormValue } from '../../search-form';

@Injectable()
export class FetchPaymentsService extends IndicatorsPartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    paymentsList$: Observable<PaymentSearchResult[]>;

    private realm$ = new ReplaySubject<PaymentInstitutionRealm>(1);

    constructor(
        private paymentSearchService: PaymentSearchService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService,
        @Inject(SEARCH_LIMIT)
        protected searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        protected debounceActionTime: number
    ) {
        super(searchLimit, debounceActionTime);

        this.paymentsList$ = this.initPaymentList();
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

    private initPaymentList(): Observable<PaymentSearchResult[]> {
        const paymentsList$ = this.searchResult$.pipe(startWith([]));

        const cachedPayments$ = paymentsList$.pipe(pairwise());
        return cachedPayments$.pipe(
            map(([cachedPayments, curPayments]: [PaymentSearchResult[], PaymentSearchResult[]]) => {
                return this.updateCachedElements(cachedPayments, curPayments);
            }),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    private updateCachedElements(
        cachedPayments: PaymentSearchResult[],
        curPayments: PaymentSearchResult[]
    ): PaymentSearchResult[] {
        const cachedPaymentsMap = cachedPayments.reduce(
            (acc: Map<string, PaymentSearchResult>, prevEl: PaymentSearchResult) => {
                acc.set(`${prevEl.invoiceID}${prevEl.id}`, prevEl);
                return acc;
            },
            new Map()
        );
        return curPayments.map((curPaymentEl: PaymentSearchResult) => {
            const newElId = `${curPaymentEl.invoiceID}${curPaymentEl.id}`;
            if (cachedPaymentsMap.has(newElId)) {
                const cachedPaymentEl = cachedPaymentsMap.get(newElId);
                return cachedPaymentEl.status === PaymentSearchResult.StatusEnum.Refunded
                    ? {
                          ...curPaymentEl,
                          status: cachedPaymentEl.status,
                      }
                    : curPaymentEl;
            }
            return curPaymentEl;
        });
    }
}
