import { Shop } from '../../../api-codegen/anapi/swagger-codegen';

const getShopName = (s: Shop | null): string | null => (s ? s.details.name : null);
const findShop = (s: Shop[], shopID: string): Shop | null => s.find(({ id }) => id === shopID);
export const toShopName = (s: Shop[], shopID: string): string | null => getShopName(findShop(s, shopID));
