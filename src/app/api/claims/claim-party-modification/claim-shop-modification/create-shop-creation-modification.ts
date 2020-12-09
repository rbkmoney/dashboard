import { PartyModification, ShopParams } from '@dsh/api-codegen/claim-management';

import { RussianShopCreateData } from '../../../../sections/payment-section/integrations/shops/shop-creation/create-russian-shop-entity/types/russian-shop-create-data';
import { createBaseShopModification } from './create-base-shop-modification';
import { makeShopDetails } from './make-shop-details';
import { makeShopLocation } from './make-shop-location';

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

export function createTestShopCreationModification(
    id: string,
    contractID: string,
    payoutToolID: string,
    { url, name }: RussianShopCreateData
): PartyModification {
    return createShopCreationModification(id, {
        category: {
            shopModificationType: 'CategoryRef' as any, // wrong enum
            id: 1,
        },
        location: makeShopLocation({ url }),
        details: makeShopDetails({ name }),
        contractID,
        payoutToolID,
    });
}
