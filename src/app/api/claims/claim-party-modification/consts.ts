import { Modification } from '@dsh/api-codegen/claim-management';

import ModificationTypeEnum = Modification.ModificationTypeEnum;

export const PARTY_MODIFICATION: Modification = {
    modificationType: ModificationTypeEnum.PartyModification,
};
