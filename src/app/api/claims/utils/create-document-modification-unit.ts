import { DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { SpecificClaimModificationUnit } from './specific-claim-modification-unit';

export const createDocumentModificationUnit = (
    documentId: string
): SpecificClaimModificationUnit<DocumentModificationUnit> => ({
    modificationType: 'ClaimModification',
    claimModificationType: {
        claimModificationType: 'DocumentModificationUnit',
        documentId,
        documentModification: {
            documentModificationType: 'DocumentCreated',
        },
    },
});
