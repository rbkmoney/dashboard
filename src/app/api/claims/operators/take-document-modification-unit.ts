import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim, DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { sortUnitsByCreatedAtAsc } from '../utils';
import { isChangesetDocumentModificationUnit } from '../type-guards';

export const takeDocumentModificationUnit = (s: Observable<Claim>): Observable<DocumentModificationUnit | null> =>
    s.pipe(
        map(c => {
            if (!c || !c.changeset) {
                return null;
            }
            const units = c.changeset.filter(isChangesetDocumentModificationUnit);
            if (units.length === 0) {
                return null;
            }
            const sorted = sortUnitsByCreatedAtAsc(units);
            const target = sorted[sorted.length - 1];
            return target.modification.claimModificationType;
        })
    );
