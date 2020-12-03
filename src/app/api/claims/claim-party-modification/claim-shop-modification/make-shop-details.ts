import { ShopDetails } from '../../../../api-codegen/claim-management';

export function makeShopDetails(params: Omit<ShopDetails, 'shopModificationType'>): ShopDetails {
    return {
        shopModificationType: 'ShopDetails' as any,
        ...params,
    };
}
