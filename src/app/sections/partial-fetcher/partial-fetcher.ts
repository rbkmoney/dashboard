import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { map, switchMap, filter, take } from 'rxjs/operators';

import { FetchResult } from './fetch-result';

export abstract class PartialFetcher<R, P> {
    private searchResult$ = new BehaviorSubject<R[]>([]);
    private continuationToken$ = new BehaviorSubject<string>(null);
    private searchParams$ = new BehaviorSubject<P>(null);
    private refresh$ = new Subject();
    private fetchMore$ = new Subject();

    constructor() {
        this.handleSearch();
        this.handleRefresh();
        this.handleFetchMore();
    }

    searchResult(): Observable<R[]> {
        return this.searchResult$.asObservable();
    }

    search(val: P) {
        this.searchParams$.next(val);
    }

    refresh() {
        this.refresh$.next();
    }

    hasMore(): Observable<boolean> {
        return this.continuationToken$.pipe(map(t => !!t));
    }

    fetchMore() {
        this.fetchMore$.next();
    }

    protected abstract fetch(params: P, continuationToken: string): Observable<FetchResult<R>>;

    private handleSearch() {
        this.searchParams$
            .pipe(
                filter(p => !!p),
                switchMap(p => this.fetch(p, null))
            )
            .subscribe(r => this.emitResult(r));
    }

    private handleRefresh() {
        this.refresh$
            .pipe(
                switchMap(() => this.searchParams$),
                switchMap(p => this.fetch(p, null))
            )
            .subscribe(r => this.emitResult(r));
    }

    private handleFetchMore() {
        const paramsAndToken$ = combineLatest(this.searchParams$, this.continuationToken$).pipe(take(1));
        this.fetchMore$
            .pipe(
                switchMap(() => paramsAndToken$),
                switchMap(([p, t]) => this.fetch(p, t))
            )
            .subscribe(r => this.emitResult(r, this.searchResult$.value));
    }

    private emitResult({ continuationToken, result }: FetchResult<R>, acc: R[] = []) {
        this.searchResult$.next([...acc, ...result]);
        this.continuationToken$.next(continuationToken);
    }
}
