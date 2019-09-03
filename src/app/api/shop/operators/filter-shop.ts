import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import negate from 'lodash.negate';

import { Shop } from '../../../api-codegen/capi';

const isTestShop = ({ categoryID }: Shop): boolean => categoryID === 1;
const toTestShops = (s: Shop[]): Shop[] => s.filter(isTestShop);
const toBattleShops = (s: Shop[]): Shop[] => s.filter(negate(isTestShop));

export const filterTestShops = (s: Observable<Shop[]>): Observable<Shop[]> => s.pipe(map(toTestShops));
export const filterBattleShops = (s: Observable<Shop[]>): Observable<Shop[]> => s.pipe(map(toBattleShops));
