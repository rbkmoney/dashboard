import { Observable, Subject, of, empty, merge } from 'rxjs';
import {
    map,
    shareReplay,
    debounceTime,
    pluck,
    switchMap,
    share,
    startWith,
    distinctUntilChanged,
    tap,
    filter
} from 'rxjs/operators';

import { FetchAction } from './fetch-action';
import { scanFetchResult, scanAction } from './operators';
import { FetchFn } from './fetch-fn';
import { progress, SHARE_REPLAY_CONF } from '../../custom-operators';
import { FetchResult } from './fetch-result';

export abstract class PartialFetcher<R, P> {
    private action$ = new Subject<FetchAction<P>>();

    searchResult$: Observable<R[]>;
    hasMore$: Observable<boolean>;
    doAction$: Observable<boolean>;
    doSearchAction$: Observable<boolean>;
    errors$: Observable<any>;

    constructor(debounceActionTime: number = 300) {
        const actionWithParams$ = this.getActionWithParams(debounceActionTime);
        const fetchResult$ = this.getFetchResult(actionWithParams$);

        this.searchResult$ = fetchResult$.pipe(
            pluck('result'),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.hasMore$ = fetchResult$.pipe(
            map(({ continuationToken }) => !!continuationToken),
            startWith(null),
            distinctUntilChanged(),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.doAction$ = progress(actionWithParams$, fetchResult$).pipe(shareReplay(SHARE_REPLAY_CONF));
        this.doSearchAction$ = progress(
            actionWithParams$.pipe(filter(({ type }) => type === 'search')),
            fetchResult$,
            true
        ).pipe(shareReplay(SHARE_REPLAY_CONF));
        this.errors$ = fetchResult$.pipe(
            switchMap(({ error }) => (error ? of(error) : empty())),
            tap(error => console.error('Partial fetcher error: ', error)),
            share()
        );

        merge(this.searchResult$, this.hasMore$, this.doAction$, this.doSearchAction$, this.errors$).subscribe();
    }

    search(value: P, limit?: number) {
        this.action$.next({ type: 'search', value, limit });
    }

    refresh() {
        this.action$.next({ type: 'search' });
    }

    fetchMore() {
        this.action$.next({ type: 'fetchMore' });
    }

    protected abstract fetch(...args: Parameters<FetchFn<P, R>>): ReturnType<FetchFn<P, R>>;

    private getActionWithParams(debounceActionTime: number): Observable<FetchAction<P>> {
        return this.action$.pipe(
            scanAction,
            debounceActionTime ? debounceTime(debounceActionTime) : tap(),
            share()
        );
    }

    private getFetchResult(actionWithParams$: Observable<FetchAction<P>>): Observable<FetchResult<R>> {
        const fetchFn = this.fetch.bind(this) as FetchFn<P, R>;
        return actionWithParams$.pipe(
            scanFetchResult(fetchFn),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }
}
