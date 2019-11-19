import { ClaimChangeset, ModificationUnit } from '../../../api-codegen/claim-management';
import { isFileModificationUnit, isClaimModification } from '../type-guards';

export const filterFileModificationUnit = (c: ClaimChangeset): ModificationUnit[] =>
    c.filter(i => isClaimModification(i.modification) && isFileModificationUnit(i.modification.claimModificationType));
