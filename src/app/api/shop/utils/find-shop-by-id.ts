import { Shop } from '@dsh/api-codegen/capi';

export const findShopById = (s: Shop[], shopID: string): Shop | null => s.find(({ id }) => id === shopID);
