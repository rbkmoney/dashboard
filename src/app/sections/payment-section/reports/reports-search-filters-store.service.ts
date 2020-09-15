import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import pickBy from 'lodash.pickby';

import { QueryParamsStore } from '@dsh/app/shared/services';

import { SearchFiltersParams } from './reports-search-filters';

const wrapValuesToArray = (params: {}): {} =>
    Object.entries(params).reduce((acc, [k, v]) => ({ ...acc, [k]: [v] }), {});

const reportTypesAndPrimitives = (v, k) => (typeof v === 'string' || typeof v === 'number') && k === 'reportTypes';

@Injectable()
export class ReportsSearchFiltersStore extends QueryParamsStore<SearchFiltersParams> {
    constructor(protected route: ActivatedRoute, protected router: Router) {
        super(router, route);
    }

    mapToData(queryParams: Params): Partial<SearchFiltersParams> {
        return {
            ...queryParams,
            ...wrapValuesToArray(pickBy(queryParams, reportTypesAndPrimitives)),
        };
    }

    mapToParams(data: SearchFiltersParams): Params {
        return data;
    }
}
