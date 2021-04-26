import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import pickBy from 'lodash-es/pickBy';

import { QueryParamsStore } from '@dsh/app/shared/services';
import { wrapValuesToArray } from '@dsh/utils';

import { SearchFiltersParams } from './refunds-search-filters';

const shopsAndInvoicesToArray = (v: any, k: string) => typeof v === 'string' && ['shopIDs', 'invoiceIDs'].includes(k);

@Injectable()
export class RefundsSearchFiltersStore extends QueryParamsStore<SearchFiltersParams> {
    constructor(protected route: ActivatedRoute, protected router: Router) {
        super(router, route);
    }

    mapToData(queryParams: Params): Partial<SearchFiltersParams> {
        return {
            ...queryParams,
            ...wrapValuesToArray(pickBy(queryParams, shopsAndInvoicesToArray)),
        };
    }

    mapToParams(data: SearchFiltersParams): Params {
        return data;
    }
}
