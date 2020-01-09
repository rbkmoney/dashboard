import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim, FileModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';
import { isChangesetFileModificationUnit } from '../type-guards';

export const takeFileModificationsUnit = (s: Observable<Claim>): Observable<FileModificationUnit[]> =>
    s.pipe(
        map(c => {
            if (!c || !c.changeset) {
                return [];
            }
            const units = c.changeset.filter(isChangesetFileModificationUnit);
            if (units.length === 0) {
                return [];
            }
            return units.map(u => u.modification.claimModificationType);
        })
    );
