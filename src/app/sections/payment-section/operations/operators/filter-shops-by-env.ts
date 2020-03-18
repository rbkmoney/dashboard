import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { filterBattleShops, filterTestShops } from '../../../../api';
import { Shop } from '../../../../api-codegen/capi';
import { routeEnv } from '../../../route-env';

export const filterShopsByEnv = (shops: Observable<Shop[]>) => (s: Observable<string>): Observable<Shop[]> =>
    s.pipe(
        switchMap(envID => {
            if (envID === routeEnv['0']) {
                return shops.pipe(filterTestShops);
            }
            if (envID === routeEnv['1']) {
                return shops.pipe(filterBattleShops);
            }
            return throwError(`Unknown envID: ${envID}`);
        })
    );
