import { ClaimModificationType, DocumentModificationUnit } from '../../../../api-codegen/claim-management';

export const isDocumentModificationUnit = (m: ClaimModificationType): m is DocumentModificationUnit =>
    m.claimModificationType === ClaimModificationType.ClaimModificationTypeEnum.DocumentModificationUnit;
