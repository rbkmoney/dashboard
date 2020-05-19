import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Shop } from '../../../api-codegen/anapi/swagger-codegen';
import { isTestShop } from '../../../api/shop/operators';
import { RouteEnv } from '../../route-env';

export const getShopSearchParamsByEnv = (shops: Observable<Shop[]>) => (
    env: Observable<RouteEnv>
): Observable<{ excludedShops: string[]; shopIDs?: string[] }> =>
    env.pipe(
        switchMap((e) =>
            combineLatest([of(e), shops.pipe(map((s) => s.filter((shop) => isTestShop(shop)).map((shop) => shop.id)))])
        ),
        map(([e, testShops]) =>
            e === RouteEnv.test
                ? {
                      excludedShops: [],
                      shopIDs: testShops,
                  }
                : { excludedShops: testShops }
        )
    );
