import { ShareReplayConfig } from 'rxjs/internal/operators/shareReplay';

// Default share replay config
export const shareReplayConf: ShareReplayConfig = { bufferSize: 1, refCount: true };
