import { Claim, DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { isChangesetDocumentModificationUnit } from '../type-guards';

export const takeDocumentModificationUnits = (c: Claim): DocumentModificationUnit[] => {
    if (!c || !c.changeset) {
        return [];
    }
    const units = c.changeset.filter(isChangesetDocumentModificationUnit);
    if (units.length === 0) {
        return [];
    }
    return units.map(u => u.modification.claimModificationType);
};
