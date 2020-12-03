import { PARTY_MODIFICATION } from '@dsh/api/claims/claim-party-modification/consts';

import {
    PartyModification,
    PartyModificationType,
    ShopModificationUnit,
} from '../../../../api-codegen/claim-management';
import PartyModificationTypeEnum = PartyModificationType.PartyModificationTypeEnum;

export function createBaseShopModification(
    modification: Omit<ShopModificationUnit, 'partyModificationType'>
): PartyModification {
    return {
        ...PARTY_MODIFICATION,
        partyModificationType: {
            partyModificationType: PartyModificationTypeEnum.ShopModificationUnit,
            ...modification,
        },
    };
}
