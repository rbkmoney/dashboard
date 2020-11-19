import { isNil } from '@ngneat/transloco';
import cloneDeep from 'lodash.clonedeep';

import { Dict } from '../../../../../../type-utils';
import { Shop as ApiShop } from '../../../../../api-codegen/capi/swagger-codegen';
import { ShopBalance, ShopItem } from '../models';

export function combineShopItem(shops: ApiShop[], balances: ShopBalance[]): ShopItem[] {
    const balancesMap = balances.reduce((acc: Dict<ShopBalance>, el: ShopBalance) => {
        acc[el.id] = cloneDeep(el);
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
