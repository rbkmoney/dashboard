import * as moment from 'moment';

import { DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { SpecificModificationUnit } from './specific-modification-unit';
import { SpecificClaimModificationUnit } from './specific-claim-modification-unit';

export const createDocumentModificationUnit = (
    modificationID: number,
    documentId: string,
    createdAt: string = moment()
        .utc()
        .format()
): SpecificModificationUnit<SpecificClaimModificationUnit<DocumentModificationUnit>> => ({
    modificationID,
    createdAt: createdAt as any,
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
