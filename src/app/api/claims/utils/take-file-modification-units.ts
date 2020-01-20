import { FileModificationUnit, ClaimChangeset } from '../../../api-codegen/claim-management';
import { isChangesetFileModificationUnit } from '../type-guards';

export const takeFileModificationUnits = (changeset: ClaimChangeset): FileModificationUnit[] =>
    changeset.filter(isChangesetFileModificationUnit).map(u => u.modification.claimModificationType);
