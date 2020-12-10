import { PartyModification } from '@dsh/api-codegen/claim-management';
import {
    createShopCreationModification,
    makeShopDetails,
    makeShopLocation,
} from '@dsh/api/claims/claim-party-modification';

import { RussianShopCreateData } from '../types/russian-shop-create-data';

export function createTestShopCreationModification(
    id: string,
    contractID: string,
    payoutToolID: string,
    { url, name }: RussianShopCreateData
): PartyModification {
    return createShopCreationModification(id, {
        category: {
            shopModificationType: 'CategoryRef',
            id: 1,
        },
        location: makeShopLocation({ url }),
        details: makeShopDetails({ name }),
        contractID,
        payoutToolID,
    });
}
