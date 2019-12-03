import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim, FileModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';
import { isChangesetFileModificationUnit } from '../type-guards';

export const takeFileModificationsUnit = (s: Observable<Claim>): Observable<FileModificationUnit[] | null> =>
    s.pipe(
        map(c => {
            if (!c || !c.changeset) {
                return null;
            }
            const units = c.changeset.filter(isChangesetFileModificationUnit);
            if (units.length === 0) {
                return null;
            }
            return units.map(unit => unit.modification.claimModificationType);
        })
    );
