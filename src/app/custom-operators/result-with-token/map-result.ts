import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ResultWithToken } from './result-with-token';

export const mapResult = <T>(s: Observable<ResultWithToken<T>>): Observable<T[]> => s.pipe(map(r => r.result));
