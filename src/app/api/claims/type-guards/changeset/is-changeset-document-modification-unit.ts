import { DocumentModificationUnit, ModificationUnit } from '../../../../api-codegen/claim-management';
import { SpecificClaimModificationUnit, SpecificModificationUnit } from '../../utils';
import { isClaimModification, isDocumentModificationUnit } from '../claim-modification';

export function isChangesetDocumentModificationUnit(
    u: ModificationUnit
): u is SpecificModificationUnit<SpecificClaimModificationUnit<DocumentModificationUnit>> {
    return u && isClaimModification(u.modification) && isDocumentModificationUnit(u.modification.claimModificationType);
}
