import { isNil } from '@ngneat/transloco';
import cloneDeep from 'lodash.clonedeep';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Dict } from '../../../../../type-utils';
import { Shop } from '../../../../api-codegen/anapi/swagger-codegen';
import { ShopBalance, ShopItem } from '../../integrations/shops/interfaces';

export const combineShopItem = (balances$: Observable<ShopBalance[]>) => (
    shops$: Observable<Shop[]>
): Observable<ShopItem[]> => {
    return shops$.pipe(
        switchMap((shops: Shop[]) => {
            return balances$.pipe(
                map((balances: ShopBalance[]) => {
                    const balancesMap = balances.reduce((acc: Dict<ShopBalance>, el: ShopBalance) => {
                        acc[el.id] = cloneDeep(el);
                        return acc;
                    }, {});

                    return shops.map((shop: Shop) => {
                        const balance = balancesMap[shop.id];
                        return {
                            ...shop,
                            balance: isNil(balance) ? null : balance.data,
                        } as ShopItem;
                    });
                })
            );
        })
    );
};
