import isNil from 'lodash-es/isNil';

import { Shop as ApiShop } from '@dsh/api-codegen/capi/swagger-codegen';
import { Dict } from '@dsh/type-utils';

import { ShopBalance } from '../../types/shop-balance';
import { ShopItem } from '../../types/shop-item';

export function combineShopItem(shops: ApiShop[], balances: ShopBalance[]): ShopItem[] {
    const balancesMap = balances.reduce((acc: Dict<ShopBalance>, el: ShopBalance) => {
        acc[el.id] = el;
        return acc;
    }, {});

    return shops.map((shop: ApiShop) => {
        const balance = balancesMap[shop.id];
        return {
            ...shop,
            balance: isNil(balance) ? null : balance.data,
        } as ShopItem;
    });
}
