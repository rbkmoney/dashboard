import isNil from 'lodash-es/isNil';

import { AmountResult } from '@dsh/api-codegen/anapi/swagger-codegen';
import { Shop as ApiShop, ShopLocation, ShopLocationUrl } from '@dsh/api-codegen/capi/swagger-codegen';

export interface ShopItem extends ApiShop {
    balance: AmountResult;
    location: ShopLocationUrl | ShopLocation;
}

export function isShopLocationUrl(location: ShopItem['location']): location is ShopLocationUrl {
    return !isNil((location as ShopLocationUrl).url);
}
