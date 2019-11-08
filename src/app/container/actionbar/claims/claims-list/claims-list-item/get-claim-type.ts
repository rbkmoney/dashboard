import { ClaimChangeset } from '../../../../../api-codegen/claim-management';
import { isClaimModification, isDocumentModificationUnit, isDocumentCreated } from '../../../../../api';

export enum ClaimType {
    documentCreated
}

export function getClaimType(changeset: ClaimChangeset): ClaimType {
    if (Array.isArray(changeset)) {
        for (const { modification } of changeset) {
            if (
                isClaimModification(modification) &&
                isDocumentModificationUnit(modification) &&
                isDocumentCreated(modification.modification)
            ) {
                return ClaimType.documentCreated;
            }
        }
    }
    return null;
}
