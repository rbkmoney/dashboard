import { isClaimModification, isDocumentCreated, isDocumentModificationUnit } from '../../api';
import { ClaimChangeset } from '../../api-codegen/claim-management';

export enum ClaimType {
    questionary = 'questionary'
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
