import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable, of, ReplaySubject, Subscriber } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { PaymentSearchResult, Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { PaymentSearchService } from '@dsh/api/search';
import { ApiShopsService } from '@dsh/api/shop';
import { getShopNameById } from '@dsh/api/shop/utils';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { isNumber } from '@dsh/app/shared/utils';
import { booleanDebounceTime, mapToTimestamp, SHARE_REPLAY_CONF } from '@dsh/operators';
import { toMinor } from '@dsh/utils';

import { PartialFetcher } from '../../../../../partial-fetcher';
import { DEBOUNCE_ACTION_TIME } from '../../consts';
import { PaymentSearchFormValue } from '../../search-form';
import { Payment } from '../../types/payment';

type ApiPayment = PaymentSearchResult & { externalID: string };

const cacheLastOperator = <T>(startValue: T) => {
    return (source: Observable<T>): Observable<[T, T]> => {
        // const cache$ = new BehaviorSubject<T>(startValue);
        let cachedValue = startValue;
        return new Observable<[T, T]>((subscriber: Subscriber<[T, T]>) => {
            const subscription = source.subscribe({
                next(value) {
                    subscriber.next([cachedValue, value]);
                    cachedValue = value;
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                },
            });

            return () => subscription.unsubscribe();
        });
        // return source.pipe(
        //     switchMap((value: T) => {
        //         const cachedValue = cache$.value;
        //         cache$.next(value);
        //         return of([cachedValue, value] as [T, T])
        //     })
        // );
    };
};

// TODO: remove this disable after making partial fetcher with injectable debounce time
/* tslint:disable:no-unused-variable */
@Injectable()
export class FetchPaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    paymentsList$: Observable<Payment[]> = combineLatest([this.searchResult$, this.shopService.shops$]).pipe(
        map(([searchResults, shops]: [ApiPayment[], Shop[]]) => this.formatPaymentsData(searchResults, shops)),
        cacheLastOperator([]),
        map(([prevList, newList]) => {
            const prevElementsMap = prevList.reduce((acc: Map<string, Payment>, prevEl: Payment) => {
                acc.set(`${prevEl.invoiceID}${prevEl.id}`, prevEl);
                return acc;
            }, new Map());
            return newList.map((newEl: Payment) => {
                const newElId = `${newEl.invoiceID}${newEl.id}`;
                if (prevElementsMap.has(newElId)) {
                    const prevElement = prevElementsMap.get(newElId);
                    return prevElement.status === PaymentSearchResult.StatusEnum.Refunded
                        ? {
                              ...newEl,
                              status: prevElement.status,
                          }
                        : newEl;
                }
                return newEl;
            });
        }),
        shareReplay(SHARE_REPLAY_CONF)
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

    private formatPaymentsData(paymentsData: ApiPayment[], shops: Shop[]): Payment[] {
        return paymentsData.map(
            ({
                id,
                amount,
                status,
                statusChangedAt,
                invoiceID,
                shopID,
                currency,
                fee = 0,
                payer,
                transactionInfo,
                error,
                externalID,
            }: ApiPayment) => {
                return {
                    id,
                    amount,
                    status,
                    currency,
                    invoiceID,
                    shopID,
                    statusChangedAt: statusChangedAt as any,
                    fee,
                    externalID,
                    error,
                    transactionInfo,
                    payer: payer as Payment['payer'],
                    shopName: getShopNameById(shops, shopID),
                };
            }
        );
    }
}
