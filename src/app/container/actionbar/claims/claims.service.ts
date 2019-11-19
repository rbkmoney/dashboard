import { Injectable } from '@angular/core';
import { shareReplay, pluck, map } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../api/claims/claims.service';
import { booleanDelay, takeError } from '../../../custom-operators';
import { filterViewClaims } from '../../../view-utils';

@Injectable()
export class ClaimsService {
    claims$ = this.claimsService.searchClaims(5).pipe(
        pluck('result'),
        map(filterViewClaims),
        shareReplay(1)
    );
    isLoading$ = this.claims$.pipe(booleanDelay());
    error$ = this.claims$.pipe(takeError);

    constructor(private claimsService: ClaimsApiService) {}
}
