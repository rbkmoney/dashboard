import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { filterBattleShops, filterTestShops } from '../../../../api';
import { Shop } from '../../../../api-codegen/capi';
import { RouteEnv } from '../../../route-env';

export const filterShopsByEnv = (shops$: Observable<Shop[]>) => (s: Observable<string>): Observable<Shop[]> =>
    s.pipe(
        switchMap((envID) => {
            switch (envID) {
                case RouteEnv.test:
                    return shops$.pipe(filterTestShops);
                case RouteEnv.real:
                    return shops$.pipe(filterBattleShops);
                default:
                    return throwError(`Unknown envID: ${envID}`);
            }
        })
    );
