import { PartyModification, PartyModificationType, ShopModificationUnit } from '@dsh/api-codegen/claim-management';
import { PARTY_MODIFICATION } from '@dsh/api/claims/claim-party-modification/consts';
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
