import { BehaviorSubject, Observable, Subscription, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { calcDelayedLoadingState } from './calc-delayed-loading-state';

export class OperationStateWrapper {
    private loading$ = new BehaviorSubject(false);
    private operationEnd$ = new BehaviorSubject(false);
    private error$ = new BehaviorSubject(false);

    constructor(private loadingDelay = 500) {}

    wrap<T>(operation: Observable<T>): Observable<T> {
        const sub = this.operationStart(this.loadingDelay);
        return operation.pipe(
            catchError(err => this.handleError(err)),
            tap(_ => this.operationEnd(sub))
        );
    }

    isLoading(): Observable<boolean> {
        return this.loading$.asObservable();
    }

    isError(): Observable<boolean> {
        return this.error$.asObservable();
    }

    isOperationEnd(): Observable<boolean> {
        return this.operationEnd$.asObservable();
    }

    dispose() {
        this.loading$.complete();
        this.error$.complete();
        this.operationEnd$.complete();
    }

    private operationStart(loadingDelay: number): Subscription {
        this.resetEmittersState();
        return this.calcLoadingDelay(loadingDelay);
    }

    private operationEnd(startSub: Subscription) {
        this.operationEnd$.next(true);
        startSub.unsubscribe();
    }

    private handleError(err: any): Observable<any> {
        this.error$.next(true);
        return throwError(err);
    }

    private calcLoadingDelay(delay: number): Subscription {
        return calcDelayedLoadingState(delay, this.error$, this.operationEnd$).subscribe(result =>
            this.loading$.next(result)
        );
    }

    private resetEmittersState() {
        this.loading$.next(false);
        this.error$.next(false);
        this.operationEnd$.next(false);
    }
}
