import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import identity from 'lodash-es/identity';
import isEqual from 'lodash-es/isEqual';
import pickBy from 'lodash-es/pickBy';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

const removeEmptyProperties = (s) => pickBy(s, identity);

@Injectable()
/**
 * @deprecated use QueryParamsService
 */
export abstract class QueryParamsStore<D> {
    data$: Observable<Partial<D>> = this.route.queryParams.pipe(
        distinctUntilChanged(isEqual),
        map((p) => this.mapToData(p)),
        shareReplay(1)
    );

    constructor(protected router: Router, protected route: ActivatedRoute) {}

    abstract mapToData(queryParams: Params): Partial<D>;

    abstract mapToParams(data: D): Params;

    preserve(data: D): void {
        const queryParams = removeEmptyProperties(this.mapToParams(data));
        void this.router.navigate([], { queryParams, preserveFragment: true });
    }
}
