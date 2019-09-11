import { Observable } from 'rxjs';
import { Params } from '@angular/router';

import { takeRouteParam } from '../../../custom-operators';
import { negateEnv, filterShopsByEnv } from './operators';
import { mapToShopId } from '../../../api';
import { Shop } from '../../../api-codegen/capi';

export const getExcludedShopIDs = (p: Observable<Params>, s: Observable<Shop[]>): Observable<string[]> =>
    p.pipe(
        takeRouteParam('envID'),
        negateEnv,
        filterShopsByEnv(s),
        mapToShopId
    );
