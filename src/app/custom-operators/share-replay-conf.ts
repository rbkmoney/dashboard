import { ShareReplayConfig } from 'rxjs/internal/operators/shareReplay';

// Default share replay config
/**
 * @deprecated use publishReplayRefCount()
 */
export const SHARE_REPLAY_CONF: ShareReplayConfig = { bufferSize: 1, refCount: true };
