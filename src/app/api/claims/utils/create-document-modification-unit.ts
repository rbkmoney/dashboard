import * as moment from 'moment';

import { ClaimModification, DocumentModificationUnit, ModificationUnit } from '../../../api-codegen/claim-management';

export const createDocumentModificationUnit = (
    modificationID: number,
    documentId: string,
    createdAt = moment()
        .utc()
        .format() as any
): ModificationUnit => ({
    modificationID,
    createdAt,
    modification: {
        modificationType: 'ClaimModification',
        claimModificationType: {
            claimModificationType: 'DocumentModificationUnit',
            documentId,
            documentModification: {
                documentModificationType: 'DocumentCreated'
            }
        } as DocumentModificationUnit
    } as ClaimModification
});
