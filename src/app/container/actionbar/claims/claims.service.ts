import { Injectable } from '@angular/core';
import { map, pluck, shareReplay } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../api/claims/claims.service';
import { booleanDebounceTime, SHARE_REPLAY_CONF, takeError } from '../../../custom-operators';
import { filterViewClaims } from '../../../view-utils';

@Injectable()
export class ClaimsService {
    claims$ = this.claimsService
        .searchClaims(5, ['pending', 'review', 'accepted'])
        .pipe(pluck('result'), map(filterViewClaims), shareReplay(1));
    noClaims$ = this.claims$.pipe(map(c => c.length === 0));
    isLoading$ = this.claims$.pipe(booleanDebounceTime(), shareReplay(SHARE_REPLAY_CONF));
    error$ = this.claims$.pipe(takeError);

    constructor(private claimsService: ClaimsApiService) {}
}
