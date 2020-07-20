import { Shop } from '../../../api-codegen/capi';

export const findShopByID = (s: Shop[], shopID: string): Shop | null => s.find(({ id }) => id === shopID);
