import { Observable, of } from 'rxjs';
import { catchError, map, filter, pluck } from 'rxjs/operators';

export type Result<T = any, E = any> =
    | {
          value: T;
          isError: false;
      }
    | {
          value: E;
          isError: true;
      };

export const selectErrors = <T>(source: Observable<T>): Observable<Result<T>> =>
    source.pipe(
        map(value => ({ value, isError: false })),
        catchError(value => of({ value, isError: true }))
    );

export const filterErrors = <T, E>(source: Observable<Result<T, E>>): Observable<E> =>
    source.pipe(
        filter(({ isError }) => isError),
        pluck('value')
    ) as Observable<E>;

export const filterSuccess = <T>(source: Observable<Result<T>>): Observable<T> =>
    source.pipe(
        filter(({ isError }) => !isError),
        pluck('value')
    );
