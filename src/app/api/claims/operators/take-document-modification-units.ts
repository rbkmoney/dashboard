import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim, DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { isChangesetDocumentModificationUnit } from '../type-guards';

export const takeDocumentModificationUnits = (s: Observable<Claim>): Observable<DocumentModificationUnit[]> =>
    s.pipe(
        map(c => {
            if (!c || !c.changeset) {
                return [];
            }
            const units = c.changeset.filter(isChangesetDocumentModificationUnit);
            if (units.length === 0) {
                return [];
            }
            return units.map(u => u.modification.claimModificationType);
        })
    );
