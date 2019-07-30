import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { genXRequestID } from '../api';
import { ClaimsService as APIClaimsService, Claim } from '../api/claim-management';
import { ClaimsWithToken } from './claims-with-token';
import { ClaimStatuses } from './claim-statuses';

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    searchClaims(
        limit: number,
        continuationToken?: string,
        claimStatuses?: ClaimStatuses[]
    ): Observable<ClaimsWithToken> {
        return this.claimsService.searchClaims(genXRequestID(), limit, undefined, continuationToken, claimStatuses);
    }

    getClaim(claimID): Observable<Claim> {
        return this.claimsService.getClaimByID(genXRequestID(), claimID);
    }
}
