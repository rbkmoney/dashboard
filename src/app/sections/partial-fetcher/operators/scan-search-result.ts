import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { concatFirstScan } from '../../../custom-operators';
import { FetchAction } from '../fetch-action';
import { FetchFn } from '../fetch-fn';
import { FetchResult } from '../fetch-result';

export const handleFetchResultError = <R>(result: R[] = [], continuationToken?: string) => (
    s: Observable<FetchResult<R>>
): Observable<FetchResult<R>> =>
    s.pipe(
        catchError(error =>
            of({
                result,
                continuationToken,
                error
            } as FetchResult<R>)
        )
    );

export const scanFetchResult = <P, R>(fn: FetchFn<P, R>) => (
    s: Observable<FetchAction<P>>
): Observable<FetchResult<R>> =>
    s.pipe(
        concatFirstScan<FetchAction<P>, FetchResult<R>>(
            ({ result, continuationToken }, action) => {
                switch (action.type) {
                    case 'search':
                        return fn(action.value).pipe(handleFetchResultError());
                    case 'fetchMore':
                        return fn(action.value, continuationToken).pipe(
                            map(r => ({
                                result: result.concat(r.result),
                                continuationToken: r.continuationToken
                            })),
                            handleFetchResultError(result, continuationToken)
                        );
                }
            },
            { result: [] }
        )
    );
