import { MonoTypeOperatorFunction } from 'rxjs';
import { publishReplay, refCount } from 'rxjs/operators';

/**
 * Gives value even after everyone has unsubscribed (unlike shareReplay({ bufferSize: 1, refCount: true }))
 */
export function publishReplayRefCount<T>(bufferSize = 1): MonoTypeOperatorFunction<T> {
    return (src$) => src$.pipe(publishReplay(bufferSize), refCount());
}
