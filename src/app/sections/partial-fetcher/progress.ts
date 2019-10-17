import { Observable, combineLatest, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { sum } from './operators';

export const progress = (start$: Observable<any>, end$: Observable<any>) =>
    combineLatest(
        start$.pipe(sum),
        end$.pipe(
            catchError(() => of()),
            sum
        )
    ).pipe(map(([starts, ends]) => starts - ends));
