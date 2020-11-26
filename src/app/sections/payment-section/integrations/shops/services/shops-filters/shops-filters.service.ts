import { Injectable } from '@angular/core';

import { ShopFiltersData } from '../../types/shop-filters-data';
import { ShopItem } from '../../types/shop-item';

@Injectable()
export class ShopsFiltersService {
    filterShops(shops: ShopItem[], filters: Partial<ShopFiltersData>): ShopItem[] {
        return Object.entries(filters).reduce(
            (acc: ShopItem[], [filterName, filterData]: [keyof ShopFiltersData, any]) => {
                switch (filterName) {
                    case 'query':
                        return this.filterQuery(shops, filterData);
                    default:
                        return acc;
                }
            },
            shops
        );
    }

    private filterQuery(shops: ShopItem[], query: ShopFiltersData['query']): ShopItem[] {
        const queryValue = query.toLowerCase();
        return shops.filter(({ id, details: { name } }: ShopItem) => {
            return id.toLowerCase().includes(queryValue) || name.toLowerCase().includes(queryValue);
        });
    }
}
