import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim, ClaimModification, FileModificationUnit } from '../../../api-codegen/claim-management/swagger-codegen';
import { filterFileModificationUnit } from '../utils';

export const takeFileModificationsUnit = (s: Observable<Claim>): Observable<FileModificationUnit[]> =>
    s.pipe(
        map(c => {
            if (!c || !c.changeset) {
                return null;
            }
            const fileModificationUnits: FileModificationUnit[] = [];
            filterFileModificationUnit(c.changeset).forEach(unit =>
                fileModificationUnits.push((unit.modification as ClaimModification)
                    .claimModificationType as FileModificationUnit)
            );
            return fileModificationUnits;
        })
    );
