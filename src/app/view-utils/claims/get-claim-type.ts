import { ClaimChangeset } from '@dsh/api-codegen/claim-management';
import { isClaimModification, isDocumentCreated, isDocumentModificationUnit } from '@dsh/api/claims';

export enum ClaimType {
    questionary = 'questionary',
}

export function getClaimType(changeset: ClaimChangeset): ClaimType {
    if (Array.isArray(changeset)) {
        for (const { modification } of changeset) {
            if (
                isClaimModification(modification) &&
                isDocumentModificationUnit(modification.claimModificationType) &&
                isDocumentCreated(modification.claimModificationType.documentModification)
            ) {
                return ClaimType.questionary;
            }
        }
    }
    return null;
}
