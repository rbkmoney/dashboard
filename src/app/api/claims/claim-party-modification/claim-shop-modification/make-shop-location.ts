import { ShopLocation } from '@dsh/api-codegen/claim-management';

export function makeShopLocation(params: Omit<ShopLocation, 'shopModificationType'>): ShopLocation {
    return {
        shopModificationType: 'ShopLocation',
        ...params,
    };
}
