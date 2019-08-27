import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { FetchResult } from './fetch-result';

export const takeContinuationToken = <R>(s: Observable<FetchResult<R>>): Observable<string> =>
    s.pipe(
        filter(r => !!r),
        map(r => r.continuationToken)
    );
