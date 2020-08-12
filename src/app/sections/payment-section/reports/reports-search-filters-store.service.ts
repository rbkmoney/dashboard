import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QueryParamsStore } from './query-params-store';
import { SearchFiltersParams } from './reports-search-filters';

@Injectable()
export class ReportsSearchFiltersStore extends QueryParamsStore<SearchFiltersParams> {
    constructor(protected route: ActivatedRoute, protected router: Router) {
        super(router, route);
    }

    map2Data(queryParams: Params): SearchFiltersParams {
        return queryParams as SearchFiltersParams;
    }

    map2Params(data: SearchFiltersParams): Params {
        return data;
    }
}
