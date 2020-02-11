import { distinctUntilChanged, debounce } from 'rxjs/operators';
import { timer, Observable, EMPTY } from 'rxjs';

export const booleanDebounceTime = (timeoutMs: number = 500) => (s: Observable<boolean>): Observable<boolean> =>
    s.pipe(
        distinctUntilChanged(),
        debounce(v => (v ? timer(timeoutMs) : EMPTY)),
        distinctUntilChanged()
    );
