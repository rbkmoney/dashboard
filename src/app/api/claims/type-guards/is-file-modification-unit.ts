import { DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { ClaimModificationType } from '../../../api-codegen/claim-management/swagger-codegen';
import { isDocumentCreated } from './is-document-created';

const isDocumentModification = (m: ClaimModificationType): m is DocumentModificationUnit =>
    m.claimModificationType === 'FileModificationUnit';

export const isFileModificationUnit = (m: ClaimModificationType): m is DocumentModificationUnit =>
    isDocumentModification(m) && isDocumentCreated(m.documentModification);
