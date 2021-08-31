import { Subject, throwError, MonoTypeOperatorFunction } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export function errorTo<T>(subject$: Subject<any>): MonoTypeOperatorFunction<T> {
    return (src$) =>
        src$.pipe(
            tap(() => subject$.next(null)),
            catchError((err) => {
                subject$.next(err);
                return throwError(err);
            })
        );
}
