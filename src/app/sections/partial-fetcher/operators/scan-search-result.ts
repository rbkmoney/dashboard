import { Observable, of } from 'rxjs';
import { catchError, map, mergeScan } from 'rxjs/operators';

import { FetchAction } from '../fetch-action';
import { FetchFn } from '../fetch-fn';
import { FetchResult } from '../fetch-result';

export const handleFetchResultError = <R>(result: R[] = [], continuationToken?: string) => (
    s: Observable<FetchResult<R>>
): Observable<FetchResult<R>> =>
    s.pipe(
        catchError(error =>
            of<FetchResult<R>>({
                result,
                continuationToken,
                error
            })
        )
    );

export const scanFetchResult = <P, R>(fn: FetchFn<P, R>) => (
    s: Observable<FetchAction<P>>
): Observable<FetchResult<R>> =>
    s.pipe(
        mergeScan<FetchAction<P>, FetchResult<R>>(
            ({ result, continuationToken }, { type, value }) => {
                switch (type) {
                    case 'search':
                        return fn(value).pipe(handleFetchResultError());
                    case 'fetchMore':
                        return fn(value, continuationToken).pipe(
                            map(r => ({
                                result: result.concat(r.result),
                                continuationToken: r.continuationToken
                            })),
                            handleFetchResultError(result, continuationToken)
                        );
                }
            },
            { result: [] },
            1
        )
    );
