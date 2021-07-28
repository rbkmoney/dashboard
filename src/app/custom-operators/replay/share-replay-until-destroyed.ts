import { untilDestroyed } from '@ngneat/until-destroy';
import { MonoTypeOperatorFunction } from 'rxjs';
import { ShareReplayConfig } from 'rxjs/internal/operators/shareReplay';
import { shareReplay } from 'rxjs/operators';

export function shareReplayUntilDestroyed<T>(
    instance: unknown,
    { bufferSize = 1, ...rest }: Omit<ShareReplayConfig, 'refCount'> = {}
): MonoTypeOperatorFunction<T> {
    return (src$) => src$.pipe(untilDestroyed(instance), shareReplay({ ...rest, bufferSize, refCount: false }));
}
