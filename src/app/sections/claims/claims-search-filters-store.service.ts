import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QueryParamsStore } from '@dsh/app/shared/services';

import { ClaimsSearchFiltersSearchParams } from './claims-search-filters/claims-search-filters-search-params';

// const claimTypesAndPrimitives = (v, k) => (typeof v === 'string' || typeof v === 'number') && k === 'reportTypes';

@Injectable()
export class ClaimsSearchFiltersStore extends QueryParamsStore<ClaimsSearchFiltersSearchParams> {
    constructor(protected route: ActivatedRoute, protected router: Router) {
        super(router, route);
    }

    mapToData(queryParams: Params): Partial<ClaimsSearchFiltersSearchParams> {
        return {
            ...queryParams,
            // ...wrapValuesToArray(pickBy(queryParams, claimTypesAndPrimitives)),
        };
    }

    mapToParams(data: ClaimsSearchFiltersSearchParams): Params {
        return data;
    }
}
