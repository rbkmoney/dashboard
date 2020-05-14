import { concat, Observable, of } from 'rxjs';
import { filter, mapTo, pairwise, pluck, startWith, switchMap, take } from 'rxjs/operators';

export function takeWhenChanged<T extends any>(o$: Observable<T>, by$: Observable<any>) {
    return o$.pipe(
        switchMap(v => concat(of([0, v]), by$.pipe(take(1), mapTo([1, v])))),
        startWith([1, undefined]),
        pairwise(),
        filter(([[prev], [curr]]) => curr === 0 && prev !== curr),
        pluck(1, 1)
    ) as Observable<T>;
}
