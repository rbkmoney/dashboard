import { PartyModification } from '@dsh/api-codegen/claim-management';
import {
    createShopCreationModification,
    makeShopDetails,
    makeShopLocation,
} from '@dsh/api/claims/claim-party-modification';

import { InternationalShopEntityFormValue } from '../types/international-shop-entity-form-value';

export function createTestShopCreationModification(
    id: string,
    contractID: string,
    payoutToolID: string,
    { shopUrl: url, shopName: name }: InternationalShopEntityFormValue
): PartyModification {
    return createShopCreationModification(id, {
        category: {
            categoryID: 1,
        },
        location: makeShopLocation({ url }),
        details: makeShopDetails({ name }),
        contractID,
        payoutToolID,
    });
}
