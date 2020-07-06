import { ClaimChangeset, DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { isClaimModification, isDocumentModificationUnit } from '../type-guards';

export const takeDocumentModificationUnits = (changeset: ClaimChangeset): DocumentModificationUnit[] =>
    changeset.reduce(
        (acc, { modification }) =>
            isClaimModification(modification) && isDocumentModificationUnit(modification.claimModificationType)
                ? acc.concat(modification.claimModificationType)
                : acc,
        [] as DocumentModificationUnit[]
    );
