import { PartyModification, ShopParams } from '@dsh/api-codegen/claim-management';

import { createBaseShopModification } from './create-base-shop-modification';

export function createShopCreationModification(
    id: string,
    params: Omit<ShopParams, 'shopModificationType'>
): PartyModification {
    return {
        ...createBaseShopModification({
            id,
            modification: {
                shopModificationType: 'ShopParams',
                ...params,
            },
        }),
    };
}
