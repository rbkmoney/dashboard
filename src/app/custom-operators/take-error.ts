import { Observable, of } from 'rxjs';
import { filter, catchError } from 'rxjs/operators';

export const takeError = <T>(source: Observable<T>) =>
    source.pipe(
        filter(_ => false),
        catchError(err => of(err))
    );
