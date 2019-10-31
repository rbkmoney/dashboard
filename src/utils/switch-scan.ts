import { Observable, isObservable, of } from 'rxjs';
import { scan, switchMap, shareReplay } from 'rxjs/operators';

export const switchScan = <T, P>(
    accumulator: (acc: P, value: T, index: number) => Observable<P>,
    seed: Observable<P> | P
) => (s: Observable<T>) => {
    const seed$ = isObservable(seed) ? seed : of(seed);
    return s.pipe(
        scan(
            (acc$, value, index) =>
                acc$.pipe(
                    switchMap(acc => accumulator(acc, value, index)),
                    shareReplay(1)
                ),
            seed$
        ),
        switchMap(v$ => v$)
    );
};
