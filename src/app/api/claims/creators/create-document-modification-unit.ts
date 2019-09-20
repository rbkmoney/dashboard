import * as moment from 'moment';

import { DocumentModification, ClaimModification, Modification } from '../../../api-codegen/claim-management';

export const createDocumentModificationUnit = (
    modificationID: number,
    documentID: string,
    createdAt = moment()
        .utc()
        .format()
) => ({
    modificationID,
    createdAt: createdAt as any,
    modification: {
        modificationType: Modification.ModificationTypeEnum.ClaimModification,
        claimModificationType: ClaimModification.ClaimModificationTypeEnum.DocumentModificationUnit,
        id: documentID,
        modification: {
            documentModificationType: DocumentModification.DocumentModificationTypeEnum.DocumentCreated
        }
    }
});
