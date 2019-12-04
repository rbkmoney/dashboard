import { merge, Observable, of } from 'rxjs';
import { catchError, delay, distinctUntilChanged, map, scan, startWith, tap } from 'rxjs/operators';

export const progress = (start$: Observable<any>, end$: Observable<any>): Observable<boolean> =>
    merge(
        start$.pipe(
            catchError(() => {
                console.log('plus');
                return of(1)
            }),
            map(() => 1)
        ),
        end$.pipe(
            delay(1),
            catchError(() => {
                console.log('minus');
                return of(-1)
            }),
            map(() => -1)
        )
    ).pipe(
        scan((acc, curr) => acc + curr, 0),
        tap((e) => console.log('sum', e)),
        map(acc => acc !== 0),
        startWith(false),
        distinctUntilChanged()
    );
