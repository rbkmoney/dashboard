import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { genXRequestID } from '../api';
import { ClaimsService as APIClaimsService, Claim } from '../api/claim-management';
import { ClaimsWithToken } from './claims-with-token';

type searchClaimsParams = Parameters<APIClaimsService['searchClaims']>;
type getClaimByIDParams = Parameters<APIClaimsService['getClaimByID']>;

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    searchClaims(
        limit: searchClaimsParams[1],
        continuationToken?: searchClaimsParams[3],
        claimStatuses?: searchClaimsParams[4]
    ): Observable<ClaimsWithToken> {
        return this.claimsService.searchClaims(genXRequestID(), limit, undefined, continuationToken, claimStatuses);
    }

    getClaimByID(claimID: getClaimByIDParams[1]): Observable<Claim> {
        return this.claimsService.getClaimByID(genXRequestID(), claimID);
    }
}
