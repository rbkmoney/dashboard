import negate from 'lodash-es/negate';

import { Shop } from '@dsh/api-codegen/capi';

export const isTestShop = ({ categoryID }: Shop): boolean => categoryID === 1;
export const toTestShops = (s: Shop[]): Shop[] => s.filter(isTestShop);
export const toLiveShops = (s: Shop[]): Shop[] => s.filter(negate(isTestShop));
