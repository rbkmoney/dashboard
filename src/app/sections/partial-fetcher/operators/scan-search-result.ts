import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { FetchResult } from '../fetch-result';
import { FetchAction } from '../fetch-action';
import { FetchFn } from '../fetch-fn';
import { concatFirstScan } from '../../../custom-operators';

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
            ({ result, continuationToken }, { type, value, limit }) => {
                switch (type) {
                    case 'search':
                        return fn(value, undefined, limit).pipe(handleFetchResultError());
                    case 'fetchMore':
                        return fn(value, continuationToken, limit).pipe(
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
