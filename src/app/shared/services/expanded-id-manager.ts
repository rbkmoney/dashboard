import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

export type ExpandedID = number;
export type Fragment = string;
export type DataSetItemID = { id: string | number };

export abstract class ExpandedIdManager<T extends DataSetItemID> {
    private expandedIdChange$: Subject<ExpandedID> = new Subject();

    expandedId$: Observable<ExpandedID> = this.route.fragment.pipe(
        take(1),
        switchMap((fragment) =>
            this.dataSet$.pipe(map((d) => d.findIndex((item) => this.toFragment(item) === fragment)))
        ),
        shareReplay(1)
    );

    constructor(protected route: ActivatedRoute, protected router: Router) {
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

    protected abstract get dataSet$(): Observable<T[]>;
}
