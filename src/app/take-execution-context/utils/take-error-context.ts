import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ExecutionContext, ExecutionErrorEvent } from '../model';

export const takeErrorContext = <T>() => (source: Observable<ExecutionContext<any, T>>): Observable<T> =>
    source.pipe(
        filter(({ type }) => type === 'Error'),
        map(({ error }: ExecutionErrorEvent<T>) => error)
    );
