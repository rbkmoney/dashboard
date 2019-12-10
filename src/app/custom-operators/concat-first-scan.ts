import { Observable, isObservable, of } from 'rxjs';
import { scan, switchMap, shareReplay, first, concatMap, startWith } from 'rxjs/operators';

export const concatFirstScan = <T, P>(
    accumulator: (acc: P, value: T, index: number) => Observable<P>,
    seed: Observable<P> | P,
    hasStartWith = true
) => (s: Observable<T>) => {
    const seed$ = (isObservable(seed) ? seed : of(seed)).pipe(
        first(),
        shareReplay(1)
    );
    const accumulate = (acc$: Observable<P>, value: T, index: number): Observable<P> =>
        acc$.pipe(
            switchMap(acc => accumulator(acc, value, index)),
            first(),
            shareReplay(1)
        );
    return hasStartWith
        ? s.pipe(
              startWith(null),
              scan((acc$, value, index) => (index === 0 ? acc$ : accumulate(acc$, value, index)), seed$),
              concatMap(v$ => v$)
          )
        : s.pipe(
              scan(accumulate, seed$),
              concatMap(v$ => v$)
          );
};
