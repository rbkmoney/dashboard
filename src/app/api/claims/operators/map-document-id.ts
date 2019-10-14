import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DocumentModificationUnit } from '../../../api-codegen/claim-management';

export const mapDocumentID = (s: Observable<DocumentModificationUnit>): Observable<string> => s.pipe(map(u => u.id));
