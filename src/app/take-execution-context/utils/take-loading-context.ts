import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ExecutionContext, ExecutionLoadingEvent } from '../model';

export const takeLoadingContext = () => (source: Observable<ExecutionContext<any>>): Observable<boolean> =>
    source.pipe(
        filter(({ type }) => type === 'Loading'),
        map(({ isLoading }: ExecutionLoadingEvent) => isLoading)
    );
