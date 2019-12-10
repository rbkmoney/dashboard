import { Observable, isObservable, of } from 'rxjs';
import { scan, switchMap, shareReplay, first, concatMap, startWith } from 'rxjs/operators';

export const concatFirstScan = <T, P>(
    accumulator: (acc: P, value: T, index: number) => Observable<P>,
    seed: Observable<P> | P
) => (s: Observable<T>) => {
    const seed$ = (isObservable(seed) ? seed : of(seed)).pipe(
        first(),
        shareReplay(1)
    );
    return s.pipe(
        startWith(null),
        scan(
            (acc$, value, index) =>
                index === 0
                    ? acc$
                    : acc$.pipe(
                          switchMap(acc => accumulator(acc, value, index)),
                          first(),
                          shareReplay(1)
                      ),
            seed$
        ),
        concatMap(v$ => v$)
    );
};
