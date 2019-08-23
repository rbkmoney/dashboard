import { Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil, shareReplay } from 'rxjs/operators';

export abstract class SimpleCacheService<T> {
    private cache$: Observable<T>;
    private reload$ = new Subject<void>();

    constructor(private refreshInterval: number = null) {}

    forceReload() {
        this.reload$.next();
        this.cache$ = null;
    }

    getCached(): Observable<T> {
        if (!this.cache$) {
            const timer$ = timer(0, this.refreshInterval);
            this.cache$ = timer$.pipe(
                switchMap(() => this.targetRequest()),
                takeUntil(this.reload$),
                shareReplay(1)
            );
        }
        return this.cache$;
    }

    protected abstract targetRequest(): Observable<T>;
}
