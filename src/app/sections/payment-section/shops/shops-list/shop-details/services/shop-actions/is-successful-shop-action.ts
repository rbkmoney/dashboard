import { ShopActionResult } from '../../types/shop-action-result';

export function isSuccessfulShopAction(action: ShopActionResult): boolean {
    return action === ShopActionResult.Success;
}
