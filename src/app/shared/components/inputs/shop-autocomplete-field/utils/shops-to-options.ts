import { Shop } from '@dsh/api-codegen/capi';
import { Option } from '@dsh/components/form-controls/autocomplete-field';

export const shopToOption = (shop: Shop): Option<Shop> => ({
    label: shop?.details?.name,
    value: shop,
});
