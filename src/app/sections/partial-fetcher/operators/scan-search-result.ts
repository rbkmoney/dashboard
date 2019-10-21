import { shareReplay, scan, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { FetchResult } from '../fetch-result';
import { FetchAction } from '../fetch-action';
import { FetchFn } from '../fetch-fn';

export const scanSearchResult = <P, R>(fn: FetchFn<P, R>) => (s: Observable<FetchAction<P>>) =>
    s.pipe(
        scan<FetchAction<P>, Observable<FetchResult<R>>>(
            (result$, action) =>
                result$.pipe(
                    switchMap(({ result, continuationToken }) => {
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
                    }),
                    shareReplay(1)
                ),
            of({ result: [] })
        ),
        switchMap(r$ => r$)
    );
