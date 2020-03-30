import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { mapToShopId } from '../../../api';
import { Shop } from '../../../api-codegen/capi';
import { filterShopsByEnv, negateEnv } from './operators';

export const getExcludedShopIDs = (p: Observable<Params>, s: Observable<Shop[]>): Observable<string[]> =>
    p.pipe(pluck('envID'), negateEnv, filterShopsByEnv(s), mapToShopId);
