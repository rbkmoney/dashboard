import { merge, Observable } from 'rxjs';
import { map, scan, startWith, switchMap } from 'rxjs/operators';

export const reduceIdxToBooleanMap = (s: Observable<Observable<boolean>[]>): Observable<{ [N in number]: boolean }> =>
    s.pipe(
        switchMap((idxToBooleanMap) =>
            merge(
                ...idxToBooleanMap.map((savedSelected$, idx) =>
                    savedSelected$.pipe(map((selected) => ({ [idx]: selected })))
                )
            ).pipe(
                scan((acc, selected) => ({ ...acc, ...selected }), {}),
                startWith({})
            )
        )
    );
