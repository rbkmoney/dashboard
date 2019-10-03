import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim } from '../../../../../api-codegen/claim-management';
import { hasDocumentModificationUnit } from '../../../../../api/claims/utils';

export const filterQuestionaryClaims = (s: Observable<Claim[]>): Observable<Claim[]> =>
    s.pipe(map(claims => claims.filter(claim => hasDocumentModificationUnit(claim))));
