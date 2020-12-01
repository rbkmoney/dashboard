import { ActivatedRoute, Router } from '@angular/router';
import isNil from 'lodash.isnil';
import { Observable, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap, take, tap } from 'rxjs/operators';

export type ExpandedID = number;
export type Fragment = string;
export type DataSetItemID = { id: string | number };

const DATA_SET_EMIT_LIMIT = 10;

export abstract class ExpandedIdManager<T extends DataSetItemID> {
    expandedId$: Observable<ExpandedID>;

    private expandedIdChange$: Subject<ExpandedID> = new Subject();

    constructor(protected route: ActivatedRoute, protected router: Router) {
        this.expandedId$ = this.route.fragment.pipe(
            take(1),
            switchMap((fragment) => this.findExpandedId(fragment)),
            shareReplay(1)
        );

        this.expandedIdChange$
            .pipe(
                switchMap((expandedId) => this.dataSet$.pipe(pluck(expandedId))),
                map((dataSetItem) => (!!dataSetItem ? this.toFragment(dataSetItem) : ''))
            )
            .subscribe((fragment) => this.router.navigate([], { fragment, queryParamsHandling: 'preserve' }));
    }

    expandedIdChange(id: ExpandedID | null) {
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

    protected abstract get dataSet$(): Observable<T[]>;

    private findExpandedId(fragment: Fragment): Observable<ExpandedID> {
        return this.dataSet$.pipe(
            take(DATA_SET_EMIT_LIMIT),
            map((d) => d.findIndex((item) => this.toFragment(item) === fragment)),
            tap((searchResult) => {
                if (!isNil(fragment) && searchResult === -1) {
                    this.fragmentNotFound(fragment);
                }
            })
        );
    }
}
