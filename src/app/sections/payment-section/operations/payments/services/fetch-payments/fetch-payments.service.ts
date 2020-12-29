import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { combineLatest, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import { PaymentSearchResult, Shop } from '@dsh/api-codegen/capi';
import { PaymentInstitutionRealm } from '@dsh/api/model';
import { PaymentSearchService } from '@dsh/api/search';
import { ApiShopsService } from '@dsh/api/shop';
import { getShopNameById } from '@dsh/api/shop/utils';
import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { isNumber } from '@dsh/app/shared/utils';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { toMinor } from '../../../../../../../utils';
import { PartialFetcher } from '../../../../../partial-fetcher';
import { DEBOUNCE_ACTION_TIME } from '../../consts';
import { PaymentSearchFormValue } from '../../search-form';
import { Payment } from '../../types/payment';

type ApiPayment = PaymentSearchResult & { externalID: string };

// TODO: remove this disable after making partial fetcher with injectable debounce time
/* tslint:disable:no-unused-variable */
@Injectable()
export class FetchPaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    paymentsList$: Observable<Payment[]> = combineLatest([this.searchResult$, this.shopService.shops$]).pipe(
        map(([searchResults, shops]: [ApiPayment[], Shop[]]) => this.formatPaymentsData(searchResults, shops))
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
                    id: `${invoiceID}_${id}`,
                    paymentID: id,
                    amount,
                    status,
                    currency,
                    invoiceID,
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
