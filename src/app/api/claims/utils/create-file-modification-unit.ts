import * as moment from 'moment';

import { SpecificModificationUnit } from './specific-modification-unit';
import { SpecificClaimModificationUnit } from './specific-claim-modification-unit';
import { FileModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';

export const createFileModificationUnit = (
    modificationID: number,
    fileId: string,
    createdAt: string = moment()
        .utc()
        .format()
): SpecificModificationUnit<SpecificClaimModificationUnit<FileModificationUnit>> => ({
    modificationID,
    createdAt: createdAt as any,
    modification: {
        modificationType: 'ClaimModification',
        claimModificationType: {
            claimModificationType: 'FileModificationUnit',
            fileId,
            fileModification: {
                fileModificationType: 'FileCreated'
            }
        }
    }
});
