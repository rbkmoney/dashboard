import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { isChangesetDocumentModificationUnit } from '../../../../../api';
import { Claim } from '../../../../../api-codegen/claim-management';

export const filterQuestionaryClaims = (s: Observable<Claim[]>): Observable<Claim[]> =>
    s.pipe(map(claims => claims.filter(claim => claim.changeset.some(isChangesetDocumentModificationUnit))));
