import { Injectable } from '@angular/core';
import { shareReplay, pluck, map } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../api/claims/claims.service';
import { booleanDelay, takeError } from '../../../custom-operators';
import { filterViewClaims } from './claims-list/claims-list-item/filter-view-claims';

@Injectable()
export class ClaimsService {
    claims$ = this.claimsService.searchClaims(50).pipe(
        pluck('result'),
        shareReplay(1),
        map(filterViewClaims),
        map(claims => claims.slice(0, 5))
    );
    isLoading$ = this.claims$.pipe(booleanDelay());
    error$ = this.claims$.pipe(takeError);

    constructor(private claimsService: ClaimsApiService) {}
}
