import { empty, merge, Observable, of, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    pluck,
    share,
    shareReplay,
    startWith,
    switchMap,
    tap
} from 'rxjs/operators';

import { progress, SHARE_REPLAY_CONF } from '../../custom-operators';
import { FetchAction } from './fetch-action';
import { FetchFn } from './fetch-fn';
import { FetchResult } from './fetch-result';
import { scanAction, scanFetchResult } from './operators';

export abstract class PartialFetcher<R, P> {
    private action$ = new Subject<FetchAction<P>>();

    readonly fetchResultChanges$: Observable<{ result: R[]; hasMore: boolean; continuationToken: string }>;

    readonly searchResult$: Observable<R[]>;
    readonly hasMore$: Observable<boolean>;
    readonly doAction$: Observable<boolean>;
    readonly doSearchAction$: Observable<boolean>;
    readonly errors$: Observable<any>;

    constructor(debounceActionTime: number = 300) {
        const actionWithParams$ = this.getActionWithParams(debounceActionTime);
        const fetchResult$ = this.getFetchResult(actionWithParams$);

        this.fetchResultChanges$ = fetchResult$.pipe(
            map(({ result, continuationToken }) => ({
                result,
                continuationToken,
                hasMore: !!continuationToken
            })),
            share()
        );
        this.searchResult$ = this.fetchResultChanges$.pipe(
            pluck('result'),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.hasMore$ = this.fetchResultChanges$.pipe(
            pluck('hasMore'),
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

        merge(
            this.searchResult$,
            this.hasMore$,
            this.doAction$,
            this.doSearchAction$,
            this.errors$,
            this.fetchResultChanges$
        ).subscribe();
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
