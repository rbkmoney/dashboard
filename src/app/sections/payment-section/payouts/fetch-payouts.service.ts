import { Injectable } from '@angular/core';
import { PartialFetcher } from '@rbkmoney/partial-fetcher';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Payout } from '@dsh/api-codegen/anapi';
import { PayoutSearchService } from '@dsh/api/search';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { SearchParams } from './types/search-params';

@Injectable()
export class FetchPayoutsService extends PartialFetcher<Payout, SearchParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(private payoutSearchService: PayoutSearchService) {
        super();
    }

    protected fetch({ fromTime, toTime, realm, ...restParams }: SearchParams, continuationToken: string) {
        return this.payoutSearchService.searchPayouts(fromTime, toTime, 10, {
            ...restParams,
            paymentInstitutionRealm: realm,
            continuationToken,
        });
    }
}
