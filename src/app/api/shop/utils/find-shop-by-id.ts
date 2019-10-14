import { Shop } from '../../../api-codegen/anapi/swagger-codegen';

export const findShopByID = (s: Shop[], shopID: string): Shop | null => s.find(({ id }) => id === shopID);
