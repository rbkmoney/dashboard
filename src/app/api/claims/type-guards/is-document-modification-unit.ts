import { ClaimModification, DocumentModificationUnit, Modification } from '../../../api-codegen/claim-management';
import { isClaimModification } from './is-claim-modification';
import { isDocumentCreated } from './is-document-created';

const isDocumentModification = (m: ClaimModification): m is DocumentModificationUnit => {
    const DocumentModificationUnitType = ClaimModification.ClaimModificationTypeEnum.DocumentModificationUnit;
    return (m as DocumentModificationUnit).claimModificationType === DocumentModificationUnitType;
};

export const isDocumentModificationUnit = (m: Modification): m is DocumentModificationUnit => {
    if (!isClaimModification(m)) {
        return false;
    }
    if (!isDocumentModification(m)) {
        return false;
    }
    if (!isDocumentCreated(m.modification)) {
        return false;
    }
    return true;
};
