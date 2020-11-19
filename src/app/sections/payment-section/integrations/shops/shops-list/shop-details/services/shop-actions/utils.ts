import { ShopActionResultEnum } from '../../enums';

export function isSuccessfulShopAction(action: ShopActionResultEnum): boolean {
    return action === ShopActionResultEnum.SUCCESS;
}
