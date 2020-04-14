import { merge, Observable, of } from 'rxjs';
import { catchError, distinctUntilChanged, map, startWith } from 'rxjs/operators';

export const progress = (start$: Observable<any>, end$: Observable<any>, startValue = false): Observable<boolean> =>
    merge(start$.pipe(map(() => true)), end$.pipe(map(() => false))).pipe(
        catchError(() => of(false)),
        startWith(startValue),
        distinctUntilChanged()
    );
