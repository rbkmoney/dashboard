import { DocumentModification, DocumentCreated } from '../../../../api-codegen/claim-management';

export const isDocumentCreated = (m: DocumentModification): m is DocumentCreated => {
    const DocumentCreatedType = DocumentModification.DocumentModificationTypeEnum.DocumentCreated;
    return (m as DocumentCreated).documentModificationType === DocumentCreatedType;
};
