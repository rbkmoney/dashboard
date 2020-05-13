import { Observable } from 'rxjs';

import { mapToShopId } from '../../../api';
import { Shop } from '../../../api-codegen/capi';
import { filterShopsByEnv, negateEnv } from './operators';

export const getExcludedShopIDs = (env: Observable<string>, s: Observable<Shop[]>): Observable<string[]> =>
    env.pipe(negateEnv, filterShopsByEnv(s), mapToShopId);
