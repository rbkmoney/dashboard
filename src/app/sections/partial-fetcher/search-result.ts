import { BehaviorSubject, Observable, Subject, combineLatest, merge, of } from 'rxjs';
import { map, switchMap, take, tap, shareReplay } from 'rxjs/operators';

import { FetchResult } from './fetch-result';
import { takeContinuationToken } from './take-continuation-token';

const toFetchResult = <R>(acc: R[], { continuationToken, result }: FetchResult<R>): FetchResult<R> => ({
    continuationToken,
    result: [...result, ...acc]
});

const reduceFetchResult = <R>(fetchResult: BehaviorSubject<FetchResult<R>>) => (s: Observable<FetchResult<R>>) =>
    s.pipe(map(r => toFetchResult(fetchResult.value.result, r)));

const takeFetchParams = <P>(searchParams: Observable<P>, continuationToken: Observable<string>) => (
    s: Observable<any>
): Observable<[P, string]> => s.pipe(switchMap(() => combineLatest(searchParams, continuationToken).pipe(take(1))));

type FetchFn<P, R> = (params: P, continuationToken: string) => Observable<FetchResult<R>>;

const callFetch = <P, R>(fn: FetchFn<P, R>) => (s: Observable<[P, string]>): Observable<FetchResult<R>> =>
    s.pipe(switchMap(([params, continuationToken]) => fn(params, continuationToken)));

const produceFetch = <P, R>(fn: FetchFn<P, R>, searchParams: Observable<P>, continuationToken: Observable<string>) => (
    s: Observable<any>
): Observable<FetchResult<R>> =>
    s.pipe(
        takeFetchParams(searchParams, continuationToken),
        callFetch(fn)
    );

const emitFetchResult = <R>(emitter: Subject<FetchResult<R>>) => (s: Observable<FetchResult<R>>) =>
    s.pipe(tap(r => emitter.next(r)));

const takeResult = <R>(s: Observable<FetchResult<R>>): Observable<R[]> => s.pipe(map(({ result }) => result));

export const searchResult = <R, P>(
    searchParams: Observable<P>,
    fetchResult: BehaviorSubject<FetchResult<R>>,
    refreshTrigger: Observable<void>,
    fetchMoreTrigger: Observable<void>,
    fetchFn: FetchFn<P, R>
): Observable<R[]> => {
    const fetchWithoutToken$ = produceFetch(fetchFn, searchParams, of(null));
    const search$ = searchParams.pipe(fetchWithoutToken$);
    const refresh$ = refreshTrigger.pipe(fetchWithoutToken$);
    const continuationToken$ = fetchResult.pipe(takeContinuationToken);
    const fetchWithToken$ = produceFetch(fetchFn, searchParams, continuationToken$);
    const more$ = fetchMoreTrigger.pipe(
        fetchWithToken$,
        reduceFetchResult(fetchResult)
    );
    return merge(search$, refresh$, more$).pipe(
        emitFetchResult(fetchResult),
        takeResult,
        shareReplay(1)
    );
};
