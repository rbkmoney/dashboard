import { interval, Observable } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';

/**
 * @param t [0,1]
 */
export function easeInOutCubic(t: number): number {
    if (t < 0.5) {
        return 4 * t ** 3;
    } else {
        return (t - 1) * (2 * t - 2) ** 2 + 1;
    }
}

export const smoothChangeTo = (
    from: number,
    to: number,
    timeMs: number = 500,
    intervalMs: number = 16
): Observable<number> => {
    const count = Math.ceil(timeMs / intervalMs);
    return interval(intervalMs).pipe(
        takeWhile((i) => i !== count),
        map((i) => easeInOutCubic((1 / count) * i) * (to - from) + from)
    );
};
