import { FileModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';
import { SpecificClaimModificationUnit } from './specific-claim-modification-unit';

export const createFileModificationUnit = (fileId: string): SpecificClaimModificationUnit<FileModificationUnit> => ({
    modificationType: 'ClaimModification',
    claimModificationType: {
        claimModificationType: 'FileModificationUnit',
        fileId,
        fileModification: {
            fileModificationType: 'FileCreated'
        }
    }
});
