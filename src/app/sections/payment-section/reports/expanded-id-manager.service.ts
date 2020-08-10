import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { first, map, pluck, shareReplay, switchMap } from 'rxjs/operators';

@Injectable()
export class ExpandedIdManager<T extends { id: string | number }> {
    private expandedIdChange$: Subject<number> = new Subject();

    data$: Observable<T[]> = of([]);

    expandedId$: Observable<number> = this.route.fragment.pipe(
        first(),
        switchMap((fragment) => this.data$.pipe(map((d) => d.findIndex(({ id }) => id + '' === fragment)))),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private router: Router) {
        this.expandedIdChange$
            .pipe(
                switchMap((expandedId) => this.data$.pipe(pluck(expandedId, 'id'))),
                map((id) => (!!id ? id.toString() : ''))
            )
            .subscribe((fragment) => this.router.navigate([], { fragment, preserveQueryParams: true }));
    }

    expandedIdChange(id: number | null) {
        if (id === null) {
            return;
        }
        this.expandedIdChange$.next(id);
    }
}
