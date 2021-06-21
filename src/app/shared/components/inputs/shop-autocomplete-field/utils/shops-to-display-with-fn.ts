import { Shop } from '@dsh/api-codegen/capi';

import { DisplayWithFn, ShopId, ShopName } from '../types';

const toMap = (shops: Shop[]): Map<ShopId, ShopName> => {
    const result = new Map<ShopId, ShopName>();
    for (const {
        id,
        details: { name },
    } of shops) {
        result.set(id, name);
    }
    return result;
};

export const shopsToDisplayWithFn = (shops: Shop[]): DisplayWithFn => {
    const map = toMap(shops);
    return (shopId: ShopId): string => map.get(shopId);
};
