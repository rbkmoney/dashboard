import { ClaimModification, DocumentModificationUnit, Modification } from '../../../../api-codegen/claim-management';
import { isClaimModification } from './is-claim-modification';
import { isDocumentCreated } from './is-document-created';

const isDocumentModification = (m: ClaimModification): m is DocumentModificationUnit => {
    const DocumentModificationUnitType = ClaimModification.ClaimModificationTypeEnum.DocumentModificationUnit;
    return (m as DocumentModificationUnit).claimModificationType === DocumentModificationUnitType;
};

export const isDocumentModificationUnit = (m: Modification): m is DocumentModificationUnit =>
    isClaimModification(m) && isDocumentModification(m) && isDocumentCreated(m.modification);
