import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { negateEnv, filterShopsByEnv } from './operators';
import { mapToShopId } from '../../../api';
import { Shop } from '../../../api-codegen/capi';

export const getExcludedShopIDs = (p: Observable<Params>, s: Observable<Shop[]>): Observable<string[]> =>
    p.pipe(pluck('envID'), negateEnv, filterShopsByEnv(s), mapToShopId);
