import { Injectable } from '@angular/core';
import { FetchResult, PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi/swagger-codegen';
import { PaymentSearchService } from '@dsh/api/search';
import { booleanDebounceTime } from '@dsh/operators';

import { PaymentSearchFormValue } from '../../payment-section/operations/payments';

@Injectable()
export class PaymentsService extends PartialFetcher<PaymentSearchResult, PaymentSearchFormValue> {
    private readonly searchLimit = 3;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));

    constructor(private paymentSearchService: PaymentSearchService) {
        super();
    }

    protected fetch(
        params: PaymentSearchFormValue,
        continuationToken: string
    ): Observable<FetchResult<PaymentSearchResult>> {
        return this.paymentSearchService.searchPaymentsByDuration(
            { amount: 3, unit: 'y' },
            params,
            this.searchLimit,
            continuationToken
        );
    }
}
