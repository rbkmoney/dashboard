import { MonoTypeOperatorFunction } from 'rxjs';
import { ShareReplayConfig } from 'rxjs/internal/operators/shareReplay';
import { shareReplay } from 'rxjs/operators';

/**
 * @deprecated use publishReplayRefCount()
 */
export const SHARE_REPLAY_CONF: ShareReplayConfig = { bufferSize: 1, refCount: true };

export function shareReplayRefCount<T>({
    bufferSize = 1,
}: Omit<ShareReplayConfig, 'refCount'> = {}): MonoTypeOperatorFunction<T> {
    return shareReplay({ bufferSize, refCount: true });
}
