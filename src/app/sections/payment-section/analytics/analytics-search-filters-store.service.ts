import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import pickBy from 'lodash-es/pickBy';

import { QueryParamsStore } from '@dsh/app/shared/services';

import { wrapValuesToArray } from '../../../../utils';
import { SearchParams } from './search-params';

const shopTypeToArray = (v, k) => typeof v === 'string' && k === 'shopIDs';

@Injectable()
export class AnalyticsSearchFiltersStore extends QueryParamsStore<SearchParams> {
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
