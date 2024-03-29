import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable, Subject } from 'rxjs';
import { pluck, shareReplay, startWith, switchMapTo } from 'rxjs/operators';

import { IdentitiesService, Identity } from '@dsh/api-codegen/wallet-api/swagger-codegen';

import { SHARE_REPLAY_CONF } from '../../custom-operators';

@Injectable()
export class IdentityService {
    private reloadIdentities$ = new Subject<void>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    identities$: Observable<Identity[]> = this.reloadIdentities$.pipe(
        startWith(undefined as Identity[]),
        switchMapTo(this.listIdentities()),
        pluck('result'),
        shareReplay(SHARE_REPLAY_CONF)
    );

    constructor(private identityService: IdentitiesService, private idGenerator: IdGeneratorService) {}

    reloadIdentities() {
        this.reloadIdentities$.next();
    }

    listIdentities() {
        return this.identityService.listIdentities(this.idGenerator.shortUuid(), 1000);
    }
}
