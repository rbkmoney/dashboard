import { Shop } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/select-search-field';

export const shopToOption = (shop: Shop): Option<Shop> => ({
    label: shop?.details?.name,
    value: shop,
});
