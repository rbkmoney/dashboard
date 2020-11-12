import negate from 'lodash.negate';

import { Shop } from '../../../api-codegen/capi';

export const isTestShop = ({ categoryID }: Shop): boolean => categoryID === 1;
export const toTestShops = (s: Shop[]): Shop[] => s.filter(isTestShop);
export const toLiveShops = (s: Shop[]): Shop[] => s.filter(negate(isTestShop));
