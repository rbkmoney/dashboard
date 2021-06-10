import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { InlineResponse20010, PaymentSearchResult, SearchService } from '@dsh/api-codegen/anapi';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';

import { toDateLike } from '../utils';
import { Duration, PaymentsSearchParams } from './model';

export type PaymentsAndContinuationToken = InlineResponse20010;

@Injectable()
export class PaymentSearchService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private searchService: SearchService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private idGenerator: IdGeneratorService
    ) {}

    searchPayments(
        fromTime: string,
        toTime: string,
        params: PaymentsSearchParams,
        limit: number,
        continuationToken?: string
    ): Observable<PaymentsAndContinuationToken> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.searchService.searchPayments(
                    this.idGenerator.shortUuid(),
                    partyID,
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    limit,
                    undefined,
                    params.shopID,
                    params.shopIDs,
                    params.paymentInstitutionRealm,
                    params.invoiceIDs,
                    params.paymentStatus,
                    params.paymentFlow,
                    params.paymentMethod,
                    params.paymentTerminalProvider,
                    params.invoiceID,
                    params.paymentID,
                    params.externalID,
                    params.payerEmail,
                    params.payerIP,
                    params.payerFingerprint,
                    params.customerID,
                    params.first6,
                    params.last4,
                    params.rrn,
                    params.approvalCode,
                    params.bankCardTokenProvider,
                    params.bankCardPaymentSystem,
                    params.paymentAmountFrom,
                    params.paymentAmountTo,
                    params.excludedShops,
                    continuationToken
                )
            )
        );
    }

    searchPaymentsByDuration(
        { amount, unit }: Duration,
        params: PaymentsSearchParams,
        limit: number,
        continuationToken?: string
    ): Observable<PaymentsAndContinuationToken> {
        const from = moment().subtract(amount, unit).startOf('d').utc().format();
        const to = moment().endOf('d').utc().format();
        return this.searchPayments(from, to, params, limit, continuationToken);
    }

    getPaymentByDuration(duration: Duration, invoiceID: string, paymentID: string): Observable<PaymentSearchResult> {
        return this.searchPaymentsByDuration(
            duration,
            {
                invoiceID,
                paymentID,
            },
            1
        ).pipe(map(({ result }) => result[0]));
    }
}
