import { ShopDetails } from '@dsh/api-codegen/claim-management';

export function makeShopDetails(params: Omit<ShopDetails, 'shopModificationType'>): ShopDetails {
    return {
        shopModificationType: 'ShopDetails',
        ...params,
    };
}
