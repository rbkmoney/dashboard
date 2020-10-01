import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import pickBy from 'lodash.pickby';

import { QueryParamsStore } from '@dsh/app/shared/services';

import { wrapValuesToArray } from '../../../../utils';
import { SearchParams } from './search-params';

const shopTypeToArray = (v, k) => typeof v === 'string' && k === 'shopIDs';

@Injectable()
export class AnalyticsSearchFiltersStore extends QueryParamsStore<SearchParams> {
    constructor(protected route: ActivatedRoute, protected router: Router) {
        super(router, route);
    }

    mapToData(queryParams: Params): Partial<SearchParams> {
        return {
            ...queryParams,
            ...wrapValuesToArray(pickBy(queryParams, shopTypeToArray)),
        };
    }

    mapToParams(data: SearchParams): Params {
        return data;
    }
}
