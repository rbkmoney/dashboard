import { Observable, combineLatest, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

const mergeBoolean = (arr: boolean[]): boolean => arr.reduce((p, c) => c || p, false);

const calcLoadingState = (breakersState: boolean[]): boolean => !mergeBoolean(breakersState);

export const calcDelayedLoadingState = (
    loadingDelay: number,
    ...breakers: Observable<boolean>[]
): Observable<boolean> =>
    timer(loadingDelay).pipe(
        switchMap(_ => combineLatest(breakers)),
        map(calcLoadingState)
    );
