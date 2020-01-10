import { ShopLocation, ShopLocationUrl } from '../../api-codegen/questionary';

function isShopLocationUrl(shopLocation: ShopLocation): shopLocation is ShopLocationUrl {
    return shopLocation && shopLocation.locationType === ShopLocation.LocationTypeEnum.ShopLocationUrl;
}

export function getShopLocationURL(shopLocation: ShopLocation): string {
    if (isShopLocationUrl(shopLocation)) {
        return shopLocation.url;
    }
    return null;
}
