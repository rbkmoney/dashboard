import { Injectable } from '@angular/core';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { InlineResponse20012, Refund, SearchService } from '@dsh/api-codegen/anapi';
import { KeycloakTokenInfoService } from '@dsh/app/shared/services';

import { genXRequestID, toDateLike } from '../utils';
import { Duration, RefundsSearchParams } from './model';

export type RefundsAndContinuationToken = InlineResponse20012;

@Injectable()
export class RefundSearchService {
    constructor(private searchService: SearchService, private keycloakTokenInfoService: KeycloakTokenInfoService) {}

    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    searchRefunds(
        fromTime: string,
        toTime: string,
        params: RefundsSearchParams,
        limit: number,
        continuationToken?: string
    ): Observable<RefundsAndContinuationToken> {
        return this.partyID$.pipe(
            switchMap((partyID) =>
                this.searchService.searchRefunds(
                    genXRequestID(),
                    toDateLike(fromTime),
                    toDateLike(toTime),
                    limit,
                    undefined,
                    partyID,
                    params.shopID,
                    params.shopIDs,
                    params.paymentInstitutionRealm,
                    undefined,
                    params.invoiceIDs,
                    params.invoiceID,
                    params.paymentID,
                    params.refundID,
                    params.externalID,
                    params.refundStatus,
                    params.excludedShops,
                    continuationToken
                )
            )
        );
    }

    searchRefundsByDuration(
        { amount, unit }: Duration,
        params: RefundsSearchParams,
        limit?: number,
        continuationToken?: string
    ): Observable<RefundsAndContinuationToken> {
        const from = moment().subtract(amount, unit).startOf('d').utc().format();
        const to = moment().endOf('d').utc().format();
        return this.searchRefunds(from, to, params, limit, continuationToken);
    }

    getRefundByDuration(duration: Duration, invoiceID: string, paymentID: string): Observable<Refund> {
        return this.searchRefundsByDuration(duration, { invoiceID, paymentID }, 1).pipe(map((res) => res.result[0]));
    }
}
