import { DocumentModification, DocumentCreated } from '../../../../api-codegen/claim-management';

export const isDocumentCreated = (m: DocumentModification): m is DocumentCreated =>
    m.documentModificationType === 'DocumentCreated';
