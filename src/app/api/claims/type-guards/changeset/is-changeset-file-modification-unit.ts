import { FileModificationUnit, ModificationUnit } from '../../../../api-codegen/claim-management';
import { SpecificClaimModificationUnit, SpecificModificationUnit } from '../../utils';
import { isClaimModification, isFileModificationUnit } from '../claim-modification';

export function isChangesetFileModificationUnit(
    u: ModificationUnit
): u is SpecificModificationUnit<SpecificClaimModificationUnit<FileModificationUnit>> {
    return u && isClaimModification(u.modification) && isFileModificationUnit(u.modification.claimModificationType);
}
