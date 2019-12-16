import { SpecificClaimModificationUnit } from './specific-claim-modification-unit';
import { FileModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';

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
