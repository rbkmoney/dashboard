import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import isEqual from 'lodash-es/isEqual';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, publishReplay, refCount, startWith } from 'rxjs/operators';

import { swapQuotes } from '@dsh/app/shared/services/query-params/utils/swap-quotes';

type Options = {
    filter?: (param: any, key: string) => boolean;
};

@UntilDestroy()
@Injectable()
export class QueryParamsService<Params> {
    params$: Observable<Params> = this.route.queryParams.pipe(
        map((params) => this.deserialize(params)),
        startWith(this.params),
        distinctUntilChanged<Params>(isEqual),
        publishReplay(1),
        refCount()
    );

    get params(): Params {
        return this.deserialize(this.route.snapshot.queryParams);
    }

    constructor(private router: Router, private route: ActivatedRoute) {}

    async set(params: Params, options?: Options): Promise<boolean> {
        return await this.router.navigate([], { queryParams: this.serialize(params, options) });
    }

    async patch(param: Partial<Params>): Promise<boolean> {
        return await this.set({ ...this.params, ...param });
    }

    async init(param: Params): Promise<boolean> {
        return await this.set({ ...param, ...this.params });
    }

    private serialize(params: Params, { filter = (v) => v !== undefined }: Options = {}): { [key: string]: any } {
        return Object.entries(params).reduce((acc, [k, v]) => {
            if (filter(v, k)) acc[k] = swapQuotes(JSON.stringify(v));
            return acc;
        }, {} as unknown);
    }

    private deserialize(params: { [key: string]: any }): Params {
        return Object.entries(params).reduce((acc, [k, v]) => {
            acc[k] = JSON.parse(swapQuotes(v || ''));
            return acc;
        }, {} as Params);
    }
}
