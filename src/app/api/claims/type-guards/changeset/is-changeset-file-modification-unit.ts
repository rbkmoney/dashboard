import { ModificationUnit } from '../../../../api-codegen/claim-management';
import { isClaimModification, isFileModificationUnit } from '../claim-modification';
import { SpecificClaimModificationUnit, SpecificModificationUnit } from '../../utils';
import { FileModificationUnit } from '../../../../api-codegen/dark-api/swagger-codegen';

export function isChangesetFileModificationUnit(
    u: ModificationUnit
): u is SpecificModificationUnit<SpecificClaimModificationUnit<FileModificationUnit>> {
    return u && isClaimModification(u.modification) && isFileModificationUnit(u.modification.claimModificationType);
}
