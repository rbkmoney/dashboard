import { Injectable } from '@angular/core';
import { Params } from '@angular/router';

import { QueryParamsStore } from '@dsh/app/shared/services';

import { ShopFiltersData } from '../../types/shop-filters-data';

@Injectable()
export class ShopsFiltersStoreService extends QueryParamsStore<ShopFiltersData> {
    mapToData(queryParams: Params): Partial<ShopFiltersData> {
        return queryParams;
    }

    mapToParams(data: ShopFiltersData): Params {
        return data;
    }
}
