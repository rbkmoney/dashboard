import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { FetchResult } from '../fetch-result';
import { FetchAction } from '../fetch-action';
import { FetchFn } from '../fetch-fn';
import { concatFirstScan } from '../../../../utils';

export const scanSearchResult = <P, R>(fn: FetchFn<P, R>) => (s: Observable<FetchAction<P>>) =>
    s.pipe(
        concatFirstScan<FetchAction<P>, FetchResult<R>>(
            ({ result, continuationToken }, action) => {
                switch (action.type) {
                    case 'search':
                        return fn(action.value);
                    case 'fetchMore':
                        return fn(action.value, continuationToken).pipe(
                            map(r => ({
                                result: result.concat(r.result),
                                continuationToken
                            }))
                        );
                }
            },
            { result: [] }
        )
    );
