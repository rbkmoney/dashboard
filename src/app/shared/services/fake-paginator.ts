import { Injectable } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { combineLatest, Observable, ReplaySubject } from 'rxjs';
import { map, pluck, scan, shareReplay, switchMapTo } from 'rxjs/operators';

import { SHARE_REPLAY_CONF } from '../../custom-operators';

const DEFAULT_PAGINATION_LIMIT = 3;

@UntilDestroy()
@Injectable()
export class FakePaginator<T> {
    values$: Observable<T[]>;
    hasMore$: Observable<boolean>;

    private allValues$ = new ReplaySubject<T[]>(1);
    private paginationLimit$ = new ReplaySubject<number>(1);
    private showMore$ = new ReplaySubject<void>(1);
    private offset$ = this.showMore$.pipe(
        switchMapTo(this.paginationLimit$),
        scan((offset, limit) => offset + limit, 0),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor() {
        this.values$ = combineLatest([this.allValues$, this.offset$]).pipe(
            map(([values, showedCount]) => values.slice(0, showedCount)),
            shareReplay(SHARE_REPLAY_CONF)
        );
        this.hasMore$ = combineLatest([this.allValues$.pipe(pluck('length')), this.offset$]).pipe(
            map(([count, showedCount]) => count > showedCount),
            shareReplay(SHARE_REPLAY_CONF)
        );
    }

    init(values: T[], paginationLimit: number = DEFAULT_PAGINATION_LIMIT) {
        this.allValues$.next(values);
        this.paginationLimit$.next(paginationLimit);
        this.showMore();
    }

    showMore() {
        this.showMore$.next();
    }
}
