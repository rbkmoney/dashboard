import { ClaimModificationType, FileModificationUnit } from '../../../../api-codegen/claim-management';

export const isFileModificationUnit = (m: ClaimModificationType): m is FileModificationUnit =>
    m.claimModificationType === ClaimModificationType.ClaimModificationTypeEnum.FileModificationUnit;
