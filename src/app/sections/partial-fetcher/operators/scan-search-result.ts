import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { FetchResult } from '../fetch-result';
import { FetchAction } from '../fetch-action';
import { FetchFn } from '../fetch-fn';
import { concatFirstScan } from '../../../../utils';

export const scanFetchResult = <P, R>(fn: FetchFn<P, R>) => (
    s: Observable<FetchAction<P>>
): Observable<FetchResult<R>> =>
    s.pipe(
        concatFirstScan<FetchAction<P>, FetchResult<R>>(
            ({ result, continuationToken }, action) => {
                switch (action.type) {
                    case 'search':
                        return fn(action.value).pipe(
                            catchError(error =>
                                of({
                                    result: [],
                                    error
                                })
                            )
                        );
                    case 'fetchMore':
                        return fn(action.value, continuationToken).pipe(
                            map(r => ({
                                result: result.concat(r.result),
                                continuationToken
                            })),
                            catchError(error =>
                                of({
                                    result,
                                    continuationToken,
                                    error
                                })
                            )
                        );
                }
            },
            { result: [] }
        )
    );
