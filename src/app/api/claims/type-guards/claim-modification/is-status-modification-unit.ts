import { ClaimModificationType, StatusModificationUnit } from '../../../../api-codegen/claim-management';

export const isStatusModificationUnit = (m: ClaimModificationType): m is StatusModificationUnit =>
    m.claimModificationType === ClaimModificationType.ClaimModificationTypeEnum.StatusModificationUnit;
