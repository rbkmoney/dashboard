import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, pluck, shareReplay, switchMap, take } from 'rxjs/operators';

export type ExpandedID = number;

export type DataSetItemID = { id: string | number };

// const dataIdToFragment = <T extends DataSetItemID>(id: T['id']): string => (!!id ? id + '' : '');
//
// const byFragment = (fragment: string) => ({ id }: DataSetItemID) => id + '' === fragment;
// const findExpandedId = <T extends DataSetItemID>(fragment: string) => (d: T[]) => d.findIndex(byFragment(fragment));

export abstract class ExpandedIdManager<T extends DataSetItemID> {
    private expandedIdChange$: Subject<ExpandedID> = new Subject();

    expandedId$: Observable<ExpandedID> = this.route.fragment.pipe(
        take(1),
        switchMap((fragment) => this.dataSet$.pipe(map(this.findExpandedId(fragment)))),
        shareReplay(1)
    );

    // tslint:disable-next-line:no-shadowed-variable
    protected dataIdToFragment<T extends DataSetItemID>(data: T): string {
        return !!data?.id ? data.id + '' : '';
    }

    protected byFragment = (fragment: string) => ({ id }: DataSetItemID) => id + '' === fragment;

    // tslint:disable-next-line:no-shadowed-variable
    protected findExpandedId = <T extends DataSetItemID>(fragment: string) => (d: T[]) =>
        d.findIndex(this.byFragment(fragment));

    constructor(protected route: ActivatedRoute, protected router: Router) {
        this.expandedIdChange$
            .pipe(
                switchMap((expandedId) => this.dataSet$.pipe(pluck(expandedId))),
                map(this.dataIdToFragment)
            )
            .subscribe((fragment) => this.router.navigate([], { fragment, queryParamsHandling: 'preserve' }));
    }

    expandedIdChange(id: ExpandedID | null) {
        if (id === null) {
            return;
        }
        this.expandedIdChange$.next(id);
    }

    protected abstract get dataSet$(): Observable<T[]>;
}
