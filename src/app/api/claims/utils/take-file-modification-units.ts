import { FileModificationUnit, Claim } from '../../../api-codegen/claim-management';
import { isChangesetFileModificationUnit } from '../type-guards';

export const takeFileModificationUnits = (c: Claim): FileModificationUnit[] => {
    if (!c || !c.changeset) {
        return [];
    }
    const units = c.changeset.filter(isChangesetFileModificationUnit);
    if (units.length === 0) {
        return [];
    }
    return units.map(u => u.modification.claimModificationType);
};
