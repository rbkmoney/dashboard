import { Params } from '@angular/router';
import isEmpty from 'lodash.isempty';

import { isTestShop } from '../../../api/shop/operators';
import { RouteEnv } from '../../route-env';
import { SearchFormValue } from '../search-form-value';
import { ShopInfo } from './operators';
import { toFormValue } from './to-form-value';

export function toSearchFormValue<T extends SearchFormValue>(
    env: RouteEnv,
    queryParams: Params,
    shopInfos: ShopInfo[]
): T {
    let newValue = {} as T;
    if (!isEmpty(queryParams)) {
        newValue = toFormValue<T>(queryParams);
    }
    if (env === RouteEnv.test) {
        newValue = { ...newValue, shopIDs: shopInfos.filter(i => isTestShop(i)).map(i => i.shopID) };
    }
    return newValue;
}
