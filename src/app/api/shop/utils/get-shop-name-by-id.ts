import { Shop } from '../../../api-codegen/anapi/swagger-codegen';
import { findShopByID } from './find-shop-by-id';
import { getShopName } from './get-shop-name';

export const toShopName = (s: Shop[], shopID: string): string | null => getShopName(findShopByID(s, shopID));
