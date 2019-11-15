import { DocumentModificationUnit, ClaimModificationType } from '../../../../api-codegen/claim-management';
import { isDocumentCreated } from './is-document-created';

const isDocumentModification = (m: ClaimModificationType): m is DocumentModificationUnit =>
    m.claimModificationType === 'DocumentModificationUnit';

export const isDocumentModificationUnit = (m: ClaimModificationType): m is DocumentModificationUnit =>
    isDocumentModification(m) && isDocumentCreated(m.documentModification);
