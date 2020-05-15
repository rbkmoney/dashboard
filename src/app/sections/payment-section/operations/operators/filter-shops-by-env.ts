import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { filterBattleShops, filterTestShops } from '../../../../api';
import { Shop } from '../../../../api-codegen/capi';
import { RouteEnv } from '../../../route-envs';

export const filterShopsByEnv = (shops: Observable<Shop[]>) => (s: Observable<string>): Observable<Shop[]> =>
    s.pipe(
        switchMap(envID => {
            if (envID === RouteEnv.test) {
                return shops.pipe(filterTestShops);
            }
            if (envID === RouteEnv.real) {
                return shops.pipe(filterBattleShops);
            }
            return throwError(`Unknown envID: ${envID}`);
        })
    );
