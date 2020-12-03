import { PartyModification, ShopParams } from '../../../../api-codegen/claim-management';
import { createBaseShopModification } from './create-base-shop-modification';

export function createShopCreationModification(
    id: string,
    params: Omit<ShopParams, 'shopModificationType'>
): PartyModification {
    return {
        ...createBaseShopModification({
            id,
            modification: {
                shopModificationType: 'ShopParams' as any,
                ...params,
            },
        }),
    };
}
