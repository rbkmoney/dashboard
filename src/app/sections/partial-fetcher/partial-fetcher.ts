import { Observable, Subject } from 'rxjs';
import { map, shareReplay, debounceTime, pluck } from 'rxjs/operators';

import { FetchAction } from './fetch-action';
import { scanSearchResult, scanAction } from './operators';
import { FetchFn } from './fetch-fn';
import { progress } from './progress';

export abstract class PartialFetcher<R, P> {
    private action$ = new Subject<FetchAction<P>>();

    searchResult$: Observable<R[]>;
    hasMore$: Observable<boolean>;
    doAction$: Observable<boolean>;

    constructor(debounceActionTime = 300) {
        let actionWithParams$ = this.action$.pipe(scanAction);
        if (debounceActionTime) actionWithParams$ = actionWithParams$.pipe(debounceTime(debounceActionTime));
        actionWithParams$ = actionWithParams$.pipe(shareReplay(1));
        const fetchFn: FetchFn<P, R> = this.fetch.bind(this);
        const searchResultWithToken$ = actionWithParams$.pipe(
            scanSearchResult(fetchFn),
            shareReplay(1)
        );
        searchResultWithToken$.subscribe();
        this.searchResult$ = searchResultWithToken$.pipe(
            pluck('result'),
            shareReplay(1)
        );
        this.hasMore$ = searchResultWithToken$.pipe(
            map(({ continuationToken }) => !!continuationToken),
            shareReplay(1)
        );
        this.doAction$ = progress(actionWithParams$, searchResultWithToken$).pipe(shareReplay(1));
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
