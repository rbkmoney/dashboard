import { BehaviorSubject, Observable } from 'rxjs';

import { combineAction } from './combine-action';
import { FetchAction, FetchFn, FetchResult } from './model';
import { mapToSearchResult, mapToHasMore } from './operators';

export abstract class PartialFetcher<R, P> {
    private action$ = new BehaviorSubject<FetchAction<P>>(null);

    searchResult$: Observable<R[]>;
    hasMore$: Observable<boolean>;

    constructor() {
        const contextFetch = this.fetch.bind(this) as FetchFn<P, R>;
        const combine = combineAction(this.action$, contextFetch);
        this.searchResult$ = combine.pipe(mapToSearchResult);
        this.hasMore$ = combine.pipe(mapToHasMore);
    }

    search(value: P) {
        this.action$.next({
            type: 'search',
            value
        });
    }

    refresh() {
        this.action$.next({
            type: 'refresh'
        });
    }

    fetchMore() {
        this.action$.next({
            type: 'fetchMore'
        });
    }

    protected abstract fetch(params: P, continuationToken: string): Observable<FetchResult<R>>;
}
