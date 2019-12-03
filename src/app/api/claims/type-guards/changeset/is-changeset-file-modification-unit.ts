import { FileModificationUnit, ModificationUnit } from '../../../../api-codegen/claim-management';
import { isClaimModification, isFileModificationUnit } from '../claim-modification';
import { SpecificClaimModificationUnit, SpecificModificationUnit } from '../../utils';

export function isChangesetFileModificationUnit(
    u: ModificationUnit
): u is SpecificModificationUnit<SpecificClaimModificationUnit<FileModificationUnit>> {
    return u && isClaimModification(u.modification) && isFileModificationUnit(u.modification.claimModificationType);
}
