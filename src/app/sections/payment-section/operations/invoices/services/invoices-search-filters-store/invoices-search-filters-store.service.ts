import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import isString from 'lodash.isstring';
import pickBy from 'lodash.pickby';

import { QueryParamsStore } from '@dsh/app/shared/services';

import { wrapValuesToArray } from '../../../../../../../utils';
import { SearchFiltersParams } from '../../invoices-search-filters';

const shopsAndInvoicesToArray = (v: any, k: string) => isString(v) && ['shopIDs', 'invoiceIDs'].includes(k);

@Injectable()
export class InvoicesSearchFiltersStore extends QueryParamsStore<SearchFiltersParams> {
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
