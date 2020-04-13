import { iif, Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const handleNull = <T>(errorMsg: string) => (s: Observable<T | null>) =>
    s.pipe(switchMap(v => iif(() => v === null, throwError(errorMsg), of(v))));
