import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { IdentityService } from '../../../../api/identity';
import { booleanDebounceTime, progress, SHARE_REPLAY_CONF } from '../../../../custom-operators';

@Injectable()
export class ReceiveIdentitiesService {
    private receiveIdentities$ = new Subject<void>();

    identities$ = this.identityService.identities$;

    isLoading$ = progress(this.receiveIdentities$, this.identities$).pipe(
        booleanDebounceTime(),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private identityService: IdentityService) {}

    receiveWebhooks() {
        this.receiveIdentities$.next();
    }
}
