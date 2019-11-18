import * as moment from 'moment';

import { DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { SpecificModificationUnit } from './specific-modification-unit';
import { SpecificClaimModificationUnit } from './specific-claim-modification-unit';

export const createDocumentModificationUnit = (
    modificationID: number,
    documentId: string,
    createdAt = moment()
        .utc()
        .format() as any
): SpecificModificationUnit<SpecificClaimModificationUnit<DocumentModificationUnit>> => ({
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
        }
    }
});
