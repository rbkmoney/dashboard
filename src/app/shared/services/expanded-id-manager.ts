import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import isNil from 'lodash-es/isNil';
import { Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, map, pluck, shareReplay, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { DataSetItemNumId, DataSetItemStrId } from '../models';

export type ExpandedId = number;
export type Fragment = string;

const DATA_SET_EMIT_LIMIT = 10;

@UntilDestroy()
@Injectable()
export abstract class ExpandedIdManager<T extends DataSetItemNumId | DataSetItemStrId> {
    expandedId$: Observable<ExpandedId>;

    private expandedIdChange$: Subject<ExpandedId> = new Subject();

    constructor(protected route: ActivatedRoute, protected router: Router) {
        this.expandedId$ = this.route.fragment.pipe(
            take(1),
            switchMap((fragment) => this.findExpandedId(fragment)),
            distinctUntilChanged(),
            untilDestroyed(this),
            shareReplay(1)
        );

        this.expandedIdChange$
            .pipe(
                switchMap((expandedId) => this.dataSet$.pipe(pluck(expandedId))),
                map((dataSetItem) => (dataSetItem ? this.toFragment(dataSetItem) : '')),
                untilDestroyed(this)
            )
            .subscribe((fragment) => this.router.navigate([], { fragment, queryParamsHandling: 'preserve' }));
    }

    expandedIdChange(id: ExpandedId | null): void {
        if (id === null) {
            return;
        }
        this.expandedIdChange$.next(id);
    }

    protected toFragment(dataSetItem: T): Fragment {
        return dataSetItem.id + '';
    }

    protected fragmentNotFound(fragment: Fragment): void {
        console.error(`Data set item is not found by fragment: ${fragment}`);
    }

    protected get hasMore(): Observable<boolean> {
        return of(true);
    }

    protected abstract get dataSet$(): Observable<T[]>;

    private findExpandedId(fragment: Fragment): Observable<ExpandedId> {
        return this.dataSet$.pipe(
            take(DATA_SET_EMIT_LIMIT),
            map((d) => d.findIndex((item) => this.toFragment(item) === fragment)),
            withLatestFrom(this.hasMore),
            tap(([searchResult, hasMore]) => {
                if (!isNil(fragment) && searchResult === -1 && hasMore) {
                    this.fragmentNotFound(fragment);
                }
            }),
            pluck(0)
        );
    }
}
