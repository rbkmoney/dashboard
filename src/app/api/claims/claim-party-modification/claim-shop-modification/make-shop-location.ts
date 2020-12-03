import { ShopLocation } from '../../../../api-codegen/claim-management';

export function makeShopLocation(params: Omit<ShopLocation, 'shopModificationType'>): ShopLocation {
    return {
        shopModificationType: 'ShopLocation' as any,
        ...params,
    };
}
