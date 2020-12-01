import { Modification } from '../../../api-codegen/claim-management';
import ModificationTypeEnum = Modification.ModificationTypeEnum;

export const MODIFICATION_TYPE = ModificationTypeEnum.PartyModification;
export const PARTY_MODIFICATION: Modification = {
    modificationType: MODIFICATION_TYPE,
};
