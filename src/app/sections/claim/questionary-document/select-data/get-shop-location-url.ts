import { ShopLocation, ShopLocationUrl } from '../../../../api-codegen/questionary';

export function getShopLocationURL(shopLocation: ShopLocation): string {
    if (shopLocation.locationType === ShopLocation.LocationTypeEnum.ShopLocationUrl) {
        return (shopLocation as ShopLocationUrl).url;
    }
    return null;
}
