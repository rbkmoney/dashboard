import { Observable, of, combineLatest } from 'rxjs';
import { delay, switchMap, map } from 'rxjs/operators';

const mergeBoolean = (arr: boolean[]): boolean => arr.reduce((p, c) => c || p, false);

const calcLoadingState = (breakersState: boolean[]): boolean => !mergeBoolean(breakersState);

export const calcDelayedLoadingState = (
    loadingDelay: number,
    ...breakers: Observable<boolean>[]
): Observable<boolean> =>
    of(true).pipe(
        delay(loadingDelay),
        switchMap(_ => combineLatest(breakers)),
        map(calcLoadingState)
    );
