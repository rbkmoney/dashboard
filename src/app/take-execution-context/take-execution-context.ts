import { BehaviorSubject, Observable, Subscription, throwError, Subject, Subscriber } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { calcDelayedLoadingState } from './calc-delayed-loading-state';
import { ExecutionContext } from './model';

const emitError = <T>(err: T, emitter: Subject<T>): Observable<T> => {
    emitter.next(err);
    return throwError(err);
};

const resetEmitters = (...emitters: Subject<boolean>[]) => emitters.forEach(emitter => emitter.next(null));

const receiveStart = (
    loadingDelay: number,
    loadingEmitter: Subject<boolean>,
    ...loadingBreakers: Subject<boolean>[]
): Subscription => calcDelayedLoadingState(loadingDelay, ...loadingBreakers).subscribe(r => loadingEmitter.next(r));

const receiveEnd = (startSub: Subscription, receiveEndEmitter: Subject<boolean>) => {
    receiveEndEmitter.next(true);
    startSub.unsubscribe();
};

const handleEmitter = <T>(
    obs: Subscriber<ExecutionContext<T, any>>,
    emitter: Subject<boolean>,
    notification: (val: boolean) => ExecutionContext<T>
): Subscription => emitter.pipe(filter(v => v !== null)).subscribe(v => obs.next(notification(v)));

export const takeExecutionContext = (loadingDelay: number = 500) => <T>(source: Observable<T>) => {
    return new Observable<ExecutionContext<T>>(observer => {
        const loading$ = new BehaviorSubject(null);
        const received$ = new BehaviorSubject(null);
        const error$ = new BehaviorSubject(null);
        const loadingSub = handleEmitter(observer, loading$, isLoading => ({
            type: 'Loading',
            isLoading
        }));
        const errorSub = handleEmitter(observer, error$, error => ({ type: 'Error', error }));
        let receiveStartSub = receiveStart(loadingDelay, loading$, received$, error$);
        return source.pipe(catchError(err => emitError(err, error$))).subscribe({
            next(value) {
                receiveEnd(receiveStartSub, received$);
                observer.next({
                    type: 'Receive',
                    value
                });
                resetEmitters(loading$, received$, error$);
                receiveStartSub = receiveStart(loadingDelay, loading$, received$, error$);
            },
            error(err) {
                observer.error(err);
            },
            complete() {
                observer.complete();
                loading$.complete();
                received$.complete();
                error$.complete();
                loadingSub.unsubscribe();
                errorSub.unsubscribe();
                receiveStartSub.unsubscribe();
            }
        });
    });
};
