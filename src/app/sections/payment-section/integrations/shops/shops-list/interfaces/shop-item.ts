import { AmountResult, Shop as ApiShop } from '../../../../../../api-codegen/anapi/swagger-codegen';

export interface ShopItem extends ApiShop {
    balance: AmountResult;
}
