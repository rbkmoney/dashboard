import { Shop } from '@dsh/api-codegen/capi';

export type ShopId = Shop['id'];
export type ShopName = Shop['details']['name'];
export type DisplayWithFn = (value: ShopId) => string;
