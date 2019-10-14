import { Shop } from '../../../api-codegen/anapi/swagger-codegen';
import { getShopName } from './get-shop-name';
import { findShopByID } from './find-shop-by-id';

export const toShopName = (s: Shop[], shopID: string): string | null => getShopName(findShopByID(s, shopID));
