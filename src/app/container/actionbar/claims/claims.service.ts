import { Injectable } from '@angular/core';
import { shareReplay, pluck } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../api/claims/claims.service';
import { booleanDelay, takeError } from '../../../custom-operators';

@Injectable()
export class ClaimsService {
    claims$ = this.claimsService.searchClaims(5).pipe(
        pluck('result'),
        shareReplay(1)
    );
    isLoading$ = this.claims$.pipe(booleanDelay());
    error$ = this.claims$.pipe(takeError);

    constructor(private claimsService: ClaimsApiService) {}
}
