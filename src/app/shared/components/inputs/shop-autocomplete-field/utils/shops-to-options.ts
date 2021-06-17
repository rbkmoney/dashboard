import { Shop } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/autocomplete-field';

import { ShopId } from '../types';

const shopToOption = (shop: Shop): Option<ShopId> => ({
    label: shop?.details?.name,
    value: shop?.id,
});

export const shopsToOptions = (shops: Shop[]): Option<ShopId>[] => shops.map(shopToOption);
