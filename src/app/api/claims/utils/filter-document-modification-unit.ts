import { ClaimChangeset, ModificationUnit } from '../../../api-codegen/claim-management';
import { isDocumentModificationUnit, isClaimModification } from '../type-guards';

export const filterDocumentModificationUnit = (c: ClaimChangeset): ModificationUnit[] =>
    c.filter(
        i => isClaimModification(i.modification) && isDocumentModificationUnit(i.modification.claimModificationType)
    );
