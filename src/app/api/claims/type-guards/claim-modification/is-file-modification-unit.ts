import { ClaimModificationType, DocumentModificationUnit } from '../../../../api-codegen/claim-management';

export const isFileModificationUnit = (m: ClaimModificationType): m is DocumentModificationUnit =>
    m.claimModificationType === ClaimModificationType.ClaimModificationTypeEnum.FileModificationUnit;
