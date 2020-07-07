import { DocumentCreated, DocumentModification } from '../../../api-codegen/claim-management';
import { createUnionTypeGuardCreator } from '../../utils';

const Type = DocumentModification.DocumentModificationTypeEnum;
const createTypeGuard = createUnionTypeGuardCreator<DocumentModification>('documentModificationType');

export const isDocumentCreated = createTypeGuard<DocumentCreated>(Type.DocumentCreated);
