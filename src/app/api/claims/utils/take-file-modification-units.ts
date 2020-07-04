import { ClaimChangeset, FileModificationUnit } from '../../../api-codegen/claim-management';
import { isClaimModification, isFileModificationUnit } from '../type-guards';

export const takeFileModificationUnits = (changeset: ClaimChangeset): FileModificationUnit[] =>
    changeset.reduce(
        (acc, { modification }) =>
            isClaimModification(modification) && isFileModificationUnit(modification.claimModificationType)
                ? acc.concat(modification.claimModificationType)
                : acc,
        [] as FileModificationUnit[]
    );
