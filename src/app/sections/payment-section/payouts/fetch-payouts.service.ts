import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { PayoutSearchService } from '../../../api';
import { Payout } from '../../../api-codegen/anapi';
import { booleanDebounceTime } from '../../../custom-operators';
import { PartialFetcher } from '../../partial-fetcher';
import { mapToTimestamp } from '../operations/operators';
import { SearchParams } from './search-params';

@Injectable()
export class FetchPayoutsService extends PartialFetcher<Payout, SearchParams> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(private payoutSearchService: PayoutSearchService) {
        super();
    }

    protected fetch({ fromTime, toTime, ...restParams }: SearchParams, continuationToken: string) {
        return this.payoutSearchService.searchPayouts(fromTime, toTime, 10, { ...restParams, continuationToken });
    }
}
