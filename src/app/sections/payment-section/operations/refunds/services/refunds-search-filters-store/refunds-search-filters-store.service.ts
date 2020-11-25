import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import isString from 'lodash.isstring';
import pickBy from 'lodash.pickby';

import { QueryParamsStore } from '@dsh/app/shared/services';

import { wrapValuesToArray } from '../../../../../../../utils';
import { SearchFiltersParams } from '../../refunds-search-filters';

const shopsAndInvoicesToArray = (v: any, k: string) => isString(v) && ['shopIDs', 'invoiceIDs'].includes(k);

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
