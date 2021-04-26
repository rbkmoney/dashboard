import { DocumentCreated, DocumentModification } from '@dsh/api-codegen/claim-management';

import { createUnionTypeGuardCreator } from '../../utils';

const TYPE = DocumentModification.DocumentModificationTypeEnum;
const createTypeGuard = createUnionTypeGuardCreator<DocumentModification>('documentModificationType');

export const isDocumentCreated = createTypeGuard<DocumentCreated>(TYPE.DocumentCreated);
