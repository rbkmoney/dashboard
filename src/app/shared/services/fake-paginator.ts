import { Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

const DEFAULT_PAGINATION_OFFSET = 3;

@UntilDestroy()
@Injectable()
export class FakePaginator<T extends any[]> {
    values$: Observable<T>;
    hasMore$: Observable<boolean>;

    private allValues: T;
    private paginationOffset: number;

    private showMore$ = new Subject<void>();
    private paginationOffset$ = new BehaviorSubject<number>(0);

    constructor() {
        this.values$ = this.paginationOffset$.pipe(
            map((offset) => this.allValues.slice(0, offset) as T),
            shareReplay(1),
            untilDestroyed(this)
        );
        this.hasMore$ = this.paginationOffset$.pipe(
            map((offset) => offset < this.allValues.length),
            shareReplay(1),
            untilDestroyed(this)
        );
        this.showMore$
            .pipe(
                map(() => Math.min(this.allValues.length, this.paginationOffset$.value + this.paginationOffset)),
                untilDestroyed(this)
            )
            .subscribe((offset) => this.paginationOffset$.next(offset));
    }

    init(values: T, paginationOffset: number = DEFAULT_PAGINATION_OFFSET) {
        this.allValues = values;
        this.paginationOffset = paginationOffset;
        this.showMore();
    }

    showMore() {
        this.showMore$.next();
    }
}
