import { Modification, ClaimModification } from '../../../../api-codegen/claim-management';

export const isClaimModification = (m: Modification): m is ClaimModification => {
    const ClaimModificationType = Modification.ModificationTypeEnum.ClaimModification;
    return (m as ClaimModification).modificationType === ClaimModificationType;
};
