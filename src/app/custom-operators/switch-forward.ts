import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export const switchForward = <F, R>(fn: (forward: F) => Observable<R>) => (source: Observable<F>): Observable<{ forward: F, result: R }> =>
    source.pipe(
        switchMap(forward => fn(forward).pipe(map(result => ({ forward, result }))))
    );
