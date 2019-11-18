import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim } from '../../../../../api-codegen/claim-management';
import { isChangesetDocumentModificationUnit } from '../../../../../api';

export const filterQuestionaryClaims = (s: Observable<Claim[]>): Observable<Claim[]> =>
    s.pipe(map(claims => claims.filter(claim => claim.changeset.some(isChangesetDocumentModificationUnit))));
