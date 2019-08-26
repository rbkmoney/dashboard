import { Observable, Subscription, Subscriber, timer } from 'rxjs';

const emitWithDelay = (ms: number, observer: Subscriber<boolean>): Subscription =>
    timer(ms).subscribe(() => observer.next(true));

export const booleanDelay = (ms: number = 500, applyToFirst = true) => <T>(source: Observable<T>) =>
    new Observable<boolean>(observer => {
        let emitterSub = emitWithDelay(ms, observer);
        const sourceSub = source.subscribe({
            next() {
                emitterSub.unsubscribe();
                observer.next(false);
                if (!applyToFirst) {
                    emitterSub = emitWithDelay(ms, observer);
                }
            },
            error(err) {
                emitterSub.unsubscribe();
                observer.next(false);
                observer.error(err);
            },
            complete() {
                emitterSub.unsubscribe();
                observer.complete();
            }
        });
        return {
            unsubscribe() {
                emitterSub.unsubscribe();
                sourceSub.unsubscribe();
            }
        };
    });
