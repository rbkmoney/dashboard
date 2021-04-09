import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { SEARCH_LIMIT } from '@dsh/app/sections/tokens';
import { booleanDebounceTime, mapToTimestamp } from '@dsh/operators';

import { DEBOUNCE_FETCHER_ACTION_TIME } from './consts';
import { PartialFetcher } from './partial-fetcher';

// TODO: remove this disable after making partial fetcher with injectable debounce time
@Injectable()
export abstract class IndicatorsPartialFetcher<R, P> extends PartialFetcher<R, P> {
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));
    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp, shareReplay(1));

    constructor(
        @Inject(SEARCH_LIMIT)
        protected searchLimit: number,
        @Inject(DEBOUNCE_FETCHER_ACTION_TIME)
        protected debounceActionTime: number
    ) {
        super(debounceActionTime);
    }
}
