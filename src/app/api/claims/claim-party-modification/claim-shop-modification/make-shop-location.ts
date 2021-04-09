import { ShopLocation } from '@dsh/api-codegen/claim-management';

export function makeShopLocation(params: Omit<ShopLocation, 'locationType'>): ShopLocation {
    return {
        locationType: ShopLocation.LocationTypeEnum.ShopLocationUrl,
        ...params,
    };
}
