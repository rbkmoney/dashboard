import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ExecutionContext, ExecutionReceiveEvent } from '../model';

export const takeReceiveContext = <T>() => (source: Observable<ExecutionContext<T>>): Observable<T> =>
    source.pipe(
        filter(({ type }) => type === 'Receive'),
        map(({ value }: ExecutionReceiveEvent<T>) => value)
    );
