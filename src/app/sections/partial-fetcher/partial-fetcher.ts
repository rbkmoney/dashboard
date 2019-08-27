import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { FetchResult } from './fetch-result';
import { searchResult } from './search-result';
import { takeContinuationToken } from './take-continuation-token';

export abstract class PartialFetcher<R, P> {
    private fetchResult$ = new BehaviorSubject<FetchResult<R>>(null);
    private searchParams$ = new BehaviorSubject<P>(null);
    private refresh$ = new Subject<void>();
    private fetchMore$ = new Subject<void>();

    searchResult$: Observable<R[]>;
    hasMore$: Observable<boolean> = this.fetchResult$.pipe(
        takeContinuationToken,
        map(t => !!t)
    );

    constructor() {
        const nonEmptyParams = this.searchParams$.pipe(filter(p => !!p));
        const contextFetch = this.fetch.bind(this);
        this.searchResult$ = searchResult(
            nonEmptyParams,
            this.fetchResult$,
            this.refresh$,
            this.fetchMore$,
            contextFetch
        );
    }

    search(val: P) {
        this.searchParams$.next(val);
    }

    refresh() {
        this.refresh$.next();
    }

    fetchMore() {
        this.fetchMore$.next();
    }

    protected abstract fetch(params: P, continuationToken: string): Observable<FetchResult<R>>;
}
