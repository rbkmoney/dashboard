import { merge, Observable, of } from 'rxjs';
import { catchError, delay, map, startWith } from 'rxjs/operators';

export const progress = (start$: Observable<any>, end$: Observable<any>): Observable<boolean> =>
    merge(
        start$.pipe(map(() => true)),
        end$.pipe(
            delay(1),
            map(() => false)
        )
    ).pipe(
        catchError(() => of(false)),
        startWith(false)
    );
