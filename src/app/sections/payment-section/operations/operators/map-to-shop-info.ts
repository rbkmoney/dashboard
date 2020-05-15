import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Shop } from '../../../../api-codegen/capi';

export interface ShopInfo {
    shopID: string;
    name: string;
}

const toShopInfo = (s: Shop[]) => s.map(({ id, categoryID, details: { name } }) => ({ shopID: id, name, categoryID }));

export const mapToShopInfo = (s: Observable<Shop[]>): Observable<ShopInfo[]> => s.pipe(map(toShopInfo));
