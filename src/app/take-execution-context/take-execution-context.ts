import { BehaviorSubject, Observable, Subscription, throwError, Subject } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { calcDelayedLoadingState } from './calc-delayed-loading-state';
import { ExecutionContext } from './model';

const handleError = <T>(err: T, emitter: Subject<T>): Observable<T> => {
    emitter.next(err);
    return throwError(err);
};

const resetEmittersState = (...emitters: Subject<boolean>[]) => emitters.forEach(emitter => emitter.next(null));

const calcLoadingDelay = (
    delay: number,
    loadingEmitter: Subject<boolean>,
    ...breakers: Observable<boolean>[]
): Subscription => calcDelayedLoadingState(delay, ...breakers).subscribe(result => loadingEmitter.next(result));

const receiveStart = (
    loadingDelay: number,
    loadingEmitter: Subject<boolean>,
    ...loadingBreakers: Subject<boolean>[]
): Subscription => {
    resetEmittersState(loadingEmitter, ...loadingBreakers);
    return calcLoadingDelay(loadingDelay, loadingEmitter, ...loadingBreakers);
};

const receiveEnd = (startSub: Subscription, receiveEndEmitter: Subject<boolean>) => {
    receiveEndEmitter.next(true);
    startSub.unsubscribe();
};

export const takeExecutionContext = (loadingDelay: number = 500) => <T>(source: Observable<T>) => {
    return new Observable<ExecutionContext<T>>(observer => {
        const loading$ = new BehaviorSubject(null);
        const received$ = new BehaviorSubject(null);
        const error$ = new BehaviorSubject(null);

        const loadingSub = loading$.pipe(filter(v => v !== null)).subscribe(isLoading =>
            observer.next({
                type: 'Loading',
                isLoading
            })
        );
        const errorSub = error$.pipe(filter(v => v !== null)).subscribe(error =>
            observer.next({
                type: 'Error',
                error
            })
        );

        let operationStartSub = receiveStart(loadingDelay, loading$, received$, error$);
        return source.pipe(catchError(err => handleError(err, error$))).subscribe({
            next(value) {
                receiveEnd(operationStartSub, received$);
                observer.next({
                    type: 'Receive',
                    value
                });
                operationStartSub = receiveStart(loadingDelay, loading$, received$, error$);
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
                operationStartSub.unsubscribe();
            }
        });
    });
};
