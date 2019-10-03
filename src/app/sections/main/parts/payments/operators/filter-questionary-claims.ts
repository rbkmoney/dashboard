import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim } from '../../../../../api-codegen/claim-management';
import { filterByDocumentModificationUnit } from '../../../../../api';

export const filterQuestionaryClaims = (s: Observable<Claim[]>): Observable<Claim[]> =>
    s.pipe(map(filterByDocumentModificationUnit));
