import { Observable, Subject, of, empty } from 'rxjs';
import {
    map,
    shareReplay,
    debounceTime,
    pluck,
    switchMap,
    share,
    startWith,
    distinctUntilChanged
} from 'rxjs/operators';

import { FetchAction } from './fetch-action';
import { scanSearchResult, scanAction } from './operators';
import { FetchFn } from './fetch-fn';
import { progress } from './progress';

export abstract class PartialFetcher<R, P> {
    private action$ = new Subject<FetchAction<P>>();

    searchResult$: Observable<R[]>;
    hasMore$: Observable<boolean>;
    doAction$: Observable<boolean>;
    errors$: Observable<any>;

    constructor(debounceActionTime = 300) {
        let actionWithParams$ = this.action$.pipe(scanAction);
        if (debounceActionTime) actionWithParams$ = actionWithParams$.pipe(debounceTime(debounceActionTime));
        actionWithParams$ = actionWithParams$.pipe(shareReplay(1));

        const fetchFn: FetchFn<P, R> = this.fetch.bind(this);
        const searchResultWithToken$ = actionWithParams$.pipe(
            scanSearchResult(fetchFn),
            shareReplay(1)
        );

        this.searchResult$ = searchResultWithToken$.pipe(
            pluck('result'),
            shareReplay(1)
        );
        this.hasMore$ = searchResultWithToken$.pipe(
            map(({ continuationToken }) => !!continuationToken),
            startWith(false),
            distinctUntilChanged(),
            shareReplay(1)
        );
        this.doAction$ = progress(actionWithParams$, searchResultWithToken$).pipe(
            startWith(false),
            distinctUntilChanged(),
            shareReplay(1)
        );
        this.errors$ = searchResultWithToken$.pipe(
            switchMap(({ error }) => (error ? of(error) : empty())),
            share()
        );

        ([this.searchResult$, this.hasMore$, this.doAction$] as Observable<any>[]).map(s$ => s$.subscribe());
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
