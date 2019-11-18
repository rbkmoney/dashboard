import { Modification, ClaimModification } from '../../../../api-codegen/claim-management';

export const isClaimModification = (m: Modification): m is ClaimModification => {
    return m.modificationType === Modification.ModificationTypeEnum.ClaimModification;
};
