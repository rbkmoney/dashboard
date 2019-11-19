import { ModificationUnit, DocumentModificationUnit } from '../../../../api-codegen/claim-management';
import { isDocumentModificationUnit, isClaimModification } from '../claim-modification';
import { SpecificModificationUnit, SpecificClaimModificationUnit } from '../../utils';

export function isChangesetDocumentModificationUnit(
    u: ModificationUnit
): u is SpecificModificationUnit<SpecificClaimModificationUnit<DocumentModificationUnit>> {
    return u && isClaimModification(u.modification) && isDocumentModificationUnit(u.modification.claimModificationType);
}
