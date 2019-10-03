import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim, DocumentModificationUnit } from '../../../api-codegen/claim-management';
import { findDocumentModificationUnit } from '../utils';
import { isDocumentModificationUnit } from '../type-guards';

export const takeDocumentModificationUnit = (s: Observable<Claim>): Observable<DocumentModificationUnit | null> =>
    s.pipe(
        map(c => {
            if (!c || !c.changeset) {
                return null;
            }
            const unit = findDocumentModificationUnit(c.changeset);
            if (!unit) {
                return null;
            }
            if (!isDocumentModificationUnit(unit.modification)) {
                return null;
            }
            return unit.modification;
        })
    );
