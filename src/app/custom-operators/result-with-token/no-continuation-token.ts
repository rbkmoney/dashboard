import { Observable, throwError, iif, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ResultWithToken } from './result-with-token';

export const noContinuationToken = <T>(s: Observable<ResultWithToken<T>>): Observable<ResultWithToken<T>> =>
    s.pipe(switchMap(r => iif(() => !!r.continuationToken, throwError('Continuation token is not supported'), of(r))));
