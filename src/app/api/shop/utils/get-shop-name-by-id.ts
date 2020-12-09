import { Shop } from '@dsh/api-codegen/capi';

import { findShopByID } from './find-shop-by-id';
import { getShopName } from './get-shop-name';

export const toShopName = (s: Shop[], shopID: string): string | null => getShopName(findShopByID(s, shopID));
