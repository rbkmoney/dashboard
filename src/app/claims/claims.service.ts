import { Injectable } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { genXRequestID } from '../api';
import { ClaimsService as APIClaimsService, Claim } from '../api/claim-management';

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    getClaims(count: number = 5): Observable<Claim[]> {
        return this.claimsService.searchClaims(genXRequestID(), count).pipe(
            map(({ result }) => result),
            share()
        );
    }

    getClaim(claimID): Observable<Claim> {
        return this.claimsService.getClaimByID(genXRequestID(), claimID);
    }
}
