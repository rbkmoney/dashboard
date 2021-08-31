import { BehaviorSubject, defer, MonoTypeOperatorFunction } from 'rxjs';
import { finalize } from 'rxjs/operators';

export function progressTo<T>(subject$: BehaviorSubject<number>): MonoTypeOperatorFunction<T> {
    return (src$) =>
        defer(() => {
            subject$.next(subject$.getValue() + 1);
            return src$.pipe(finalize(() => subject$.next(subject$.getValue() - 1)));
        });
}
