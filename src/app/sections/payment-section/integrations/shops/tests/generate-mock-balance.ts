import isNil from 'lodash-es/isNil';

import { ShopBalance } from '../types/shop-balance';
import { generateMockShopId } from './generate-mock-shop-id';

export function generateMockBalance(
    order: number,
    amount: number | null = null,
    currency: string = 'USD'
): ShopBalance {
    return {
        id: generateMockShopId(order),
        data: isNil(amount)
            ? null
            : {
                  amount,
                  currency,
              },
    };
}
