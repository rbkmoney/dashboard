import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import isEmpty from 'lodash-es/isEmpty';
import isEqual from 'lodash-es/isEqual';
import negate from 'lodash-es/negate';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, publishReplay, refCount, startWith } from 'rxjs/operators';

import { Serializer } from './types/serializer';
import { deserializeQueryParam } from './utils/deserialize-query-param';
import { QUERY_PARAMS_SERIALIZERS } from './utils/query-params-serializers';
import { serializeQueryParam } from './utils/serialize-query-param';

type Options = {
    filter?: (param: unknown, key: string) => boolean;
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

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        @Inject(QUERY_PARAMS_SERIALIZERS) private serializers: Serializer[] = []
    ) {}

    async set(params: Params, options?: Options): Promise<boolean> {
        return await this.router.navigate([], { queryParams: this.serialize(params, options) });
    }

    async patch(param: Partial<Params>): Promise<boolean> {
        return await this.set({ ...this.params, ...param });
    }

    async init(param: Params): Promise<boolean> {
        return await this.set({ ...param, ...this.params });
    }

    private serialize(params: Params, { filter = negate(isEmpty) }: Options = {}): { [key: string]: string } {
        return Object.entries(params).reduce((acc, [k, v]) => {
            if (filter(v, k)) acc[k] = serializeQueryParam(v, this.serializers);
            return acc;
        }, {} as { [key: string]: string });
    }

    private deserialize(params: { [key: string]: string }): Params {
        return Object.entries(params).reduce((acc, [k, v]) => {
            try {
                acc[k] = deserializeQueryParam<Params[keyof Params]>(v, this.serializers);
            } catch (err) {
                console.error(err);
            }
            return acc;
        }, {} as Params);
    }
}
