import { shareReplay, scan, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { FetchResult } from '../fetch-result';
import { FetchAction } from '../fetch-action';
import { FetchFn } from '../fetch-fn';

export const scanSearchResult = <P, R>(fn: FetchFn<P, R>) => (s: Observable<FetchAction<P>>) =>
    s.pipe(
        scan(
            (result$, action) =>
                result$.pipe(
                    switchMap(result => {
                        switch (action.type) {
                            case 'search':
                                return fn(action.value, null);
                            case 'fetchMore':
                                return fn(action.value, result.continuationToken).pipe(
                                    map(r => ({
                                        result: [...result.result, ...r.result],
                                        continuationToken: result.continuationToken
                                    }))
                                );
                        }
                    }),
                    shareReplay(1)
                ),
            of({ result: [] } as FetchResult<R>)
        ),
        switchMap(r$ => r$)
    );
