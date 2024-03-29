import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { InlineResponse2009, Invoice, SearchService } from '@dsh/api-codegen/anapi';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';

import { toDateLike } from '../utils';
import { Duration, InvoicesSearchParams } from './model';

export type InvoicesAndContinuationToken = InlineResponse2009;

@Injectable()
export class InvoiceSearchService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(
        private searchService: SearchService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private idGenerator: IdGeneratorService
    ) {}

    searchInvoices(
        fromTime: string,
        toTime: string,
        params: InvoicesSearchParams,
        limit: number,
        continuationToken?: string
    ): Observable<InvoicesAndContinuationToken> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.searchService.searchInvoices(
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
                    params.invoiceStatus,
                    params.invoiceID,
                    params.externalID,
                    params.invoiceAmountFrom,
                    params.invoiceAmountTo,
                    params.excludedShops,
                    continuationToken
                )
            )
        );
    }

    searchInvoicesByDuration(
        { amount, unit }: Duration,
        invoiceID: string,
        limit: number
    ): Observable<InvoicesAndContinuationToken> {
        const from = moment().subtract(amount, unit).startOf('d').utc().format();
        const to = moment().endOf('d').utc().format();
        return this.searchInvoices(from, to, { invoiceID }, limit);
    }

    getInvoiceByDuration(duration: Duration, invoiceID: string): Observable<Invoice> {
        return this.searchInvoicesByDuration(duration, invoiceID, 1).pipe(map((res) => res.result[0]));
    }
}
