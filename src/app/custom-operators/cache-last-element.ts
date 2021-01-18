import { Observable, Subscriber } from 'rxjs';

export const cacheLastElement = <T>(startValue: T) => {
    return (source: Observable<T>): Observable<[T, T]> => {
        let cachedValue = startValue;
        return new Observable<[T, T]>((subscriber: Subscriber<[T, T]>) => {
            const subscription = source.subscribe({
                next(value) {
                    subscriber.next([cachedValue, value]);
                    cachedValue = value;
                },
                error(error) {
                    subscriber.error(error);
                },
                complete() {
                    subscriber.complete();
                },
            });

            return () => subscription.unsubscribe();
        });
    };
};
