import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim, DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { filterDocumentModificationUnit, sortUnitsByCreatedAtAsc } from '../utils';

export const takeDocumentModificationUnit = (s: Observable<Claim>): Observable<DocumentModificationUnit | null> =>
    s.pipe(
        map(c => {
            if (!c || !c.changeset) {
                return null;
            }
            const units = filterDocumentModificationUnit(c.changeset);
            if (units.length === 0) {
                return null;
            }
            const sorted = sortUnitsByCreatedAtAsc(units);
            const target = sorted[sorted.length - 1];
            return target.modification;
        })
    );
