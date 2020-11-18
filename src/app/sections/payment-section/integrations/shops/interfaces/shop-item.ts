import { AmountResult, Shop as ApiShop, ShopLocationUrl } from '../../../../../api-codegen/anapi/swagger-codegen';

export interface ShopItem extends ApiShop {
    balance: AmountResult;
    location: ShopLocationUrl;
}
