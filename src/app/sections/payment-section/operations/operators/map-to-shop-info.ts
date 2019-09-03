import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from '../../../../api-codegen/capi';

export interface ShopInfo {
    shopID: string;
    name: string;
}

const toShopInfo = (s: Shop[]) => s.map(({ id, details: { name } }) => ({ shopID: id, name }));

export const mapToShopInfo = (s: Observable<Shop[]>): Observable<ShopInfo[]> => s.pipe(map(toShopInfo));
