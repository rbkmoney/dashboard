import { Observable, ReplaySubject } from 'rxjs';

/**
 * Observable to ReplaySubject(1) Observable
 * Save the result and return it each subscription (like cache/memoize)
 */
export function once<T>(observable: Observable<T>): Observable<T> {
    const result$ = new ReplaySubject<T>(1);
    let subscription = observable.subscribe(
        result => {
            result$.next(result);
            subscription.unsubscribe();
            subscription = undefined;
        },
        error => {
            result$.error(error);
        }
    );
    return result$;
}
