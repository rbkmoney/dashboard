import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ShopInfo } from './map-to-shop-info';

export const filterByNameAndId = (s: Observable<[string, ShopInfo[]]>): Observable<ShopInfo[]> =>
    s.pipe(map(([v, shops]) => shops.filter(shop => (v ? (shop.name + shop.shopID).toLowerCase().includes(v) : true))));
