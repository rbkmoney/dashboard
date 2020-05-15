import { combineLatest, iif, Observable, of } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';

import { isTestShop } from '../../../api/shop/operators';
import { RouteEnv } from '../../route-envs';
import { ShopInfo } from './operators';

export const getShopSearchParamsByEnv = (shops: Observable<ShopInfo[]>) => (
    env: Observable<RouteEnv>
): Observable<{ excludedShops: string[]; shopIDs?: string[] }> =>
    env.pipe(
        switchMap(e => combineLatest([of(e), shops])),
        mergeMap(([e, s]) => {
            const testShops = s.filter(shop => isTestShop(shop)).map(shop => shop.shopID);
            return iif(
                () => e === RouteEnv.test,
                of({ excludedShops: [], shopIDs: testShops }),
                of({ excludedShops: testShops })
            );
        })
    );
