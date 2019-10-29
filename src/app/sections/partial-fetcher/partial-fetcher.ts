import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, debounceTime } from 'rxjs/operators';

import { FetchAction } from './fetch-action';
import { scanSearchResult, scanAction } from './operators';
import { FetchFn } from './fetch-fn';
import { progress } from './progress';

export abstract class PartialFetcher<R, P> {
    private action$ = new ReplaySubject<FetchAction<P>>(1);

    searchResult$: Observable<R[]>;
    hasMore$: Observable<boolean>;
    doAction$: Observable<boolean>;

    constructor(debounceActionTime = 300) {
        const actionWithParams$ = this.action$.pipe(
            scanAction,
            debounceTime(debounceActionTime),
            shareReplay(1)
        );
        const fetchFn: FetchFn<P, R> = this.fetch.bind(this);
        const searchResultWithToken$ = actionWithParams$.pipe(
            scanSearchResult(fetchFn),
            shareReplay(1)
        );
        this.doAction$ = progress(actionWithParams$, searchResultWithToken$).pipe(shareReplay(1));
        this.searchResult$ = searchResultWithToken$.pipe(map(({ result }) => result));
        this.hasMore$ = searchResultWithToken$.pipe(map(({ continuationToken }) => !!continuationToken));
    }

    search(value: P) {
        this.action$.next({ type: 'search', value });
    }

    refresh() {
        this.action$.next({ type: 'search' });
    }

    fetchMore() {
        this.action$.next({ type: 'fetchMore' });
    }

    protected abstract fetch(...args: Parameters<FetchFn<P, R>>): ReturnType<FetchFn<P, R>>;
}
