import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim } from '../../../api-codegen/claim-management/swagger-codegen';
import { isChangesetFileModificationUnit } from '../type-guards';
import { SpecificClaimModificationUnit, SpecificModificationUnit } from '../utils';
import { FileModificationUnit } from '../../../api-codegen/dark-api/swagger-codegen';

export const takeFileModificationsUnit = (
    s: Observable<Claim>
): Observable<SpecificModificationUnit<SpecificClaimModificationUnit<FileModificationUnit>>[]> =>
    s.pipe(
        map(c => {
            if (!c || !c.changeset) {
                return [];
            }
            return c.changeset.filter(isChangesetFileModificationUnit);
        })
    );
