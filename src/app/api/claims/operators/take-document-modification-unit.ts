import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Claim, DocumentModificationUnit } from '../../../api-codegen/claim-management';

export const takeDocumentModificationUnit = (s: Observable<Claim>): Observable<DocumentModificationUnit | null> =>
    s.pipe(map(() => null));
