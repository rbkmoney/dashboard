import { Observable, of } from 'rxjs';
import { catchError, filter, pluck } from 'rxjs/operators';

export class BasicError<T = any> {
    constructor(public error: T) {}
}

export const replaceError = <T, E = any>(source: Observable<T>): Observable<T | BasicError<E>> =>
    source.pipe(catchError((value) => of(new BasicError(value))));

export const filterError = <E>(source: Observable<any | BasicError<E>>): Observable<E> =>
    source.pipe(
        filter((value) => value instanceof BasicError),
        pluck('error')
    );

export const filterPayload = <T>(source: Observable<T | BasicError<any>>): Observable<T> =>
    source.pipe(filter((value) => !(value instanceof BasicError))) as Observable<T>;
