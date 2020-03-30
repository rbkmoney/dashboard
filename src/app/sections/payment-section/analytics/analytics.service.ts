import { Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../../custom-operators';
import { SearchParams } from './search-params';
import { SearchParamsWithSplitUnit } from './search-params-with-split-unit';
import { searchParamsToParamsWithSplitUnit, searchParamsToStatSearchParams } from './utils';

@Injectable()
export class AnalyticsService {
    private searchParams$ = new Subject<SearchParams>();

    distributionSearchParams$ = this.searchParams$.pipe(shareReplay(SHARE_REPLAY_CONF));

    statSearchParams$ = this.searchParams$.pipe(
        map(searchParamsToStatSearchParams),
        shareReplay(SHARE_REPLAY_CONF)
    );
    searchParamsWithSplitUnit$: Observable<SearchParamsWithSplitUnit> = this.searchParams$.pipe(
        map(searchParamsToParamsWithSplitUnit),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor() {
        merge(this.statSearchParams$, this.searchParamsWithSplitUnit$, this.distributionSearchParams$).subscribe();
    }

    updateSearchParams(searchParams: SearchParams) {
        this.searchParams$.next(searchParams);
    }
}
