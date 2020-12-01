import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import pickBy from 'lodash.pickby';

import { QueryParamsStore } from '@dsh/app/shared/services';

import { wrapValuesToArray } from '../../../../../../../utils';
import { SearchFiltersParams } from '../../invoices-search-filters';

@Injectable()
export class InvoicesSearchFiltersStore extends QueryParamsStore<SearchFiltersParams> {
    mapToData(queryParams: Params): Partial<SearchFiltersParams> {
        return {
            ...queryParams,
            ...wrapValuesToArray(this.pickShopsAndInvoices(queryParams)),
        };
    }

    mapToParams(data: SearchFiltersParams): Params {
        return data;
    }

    pickShopsAndInvoices(params: any) {
        return pickBy(params, (v, k) => typeof v === 'string' && ['shopIDs', 'invoiceIDs'].includes(k));
    }
}
