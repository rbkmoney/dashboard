import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { genXRequestID } from '../api-codegen';
import { ClaimsService as APIClaimsService, Claim, StatusModificationUnit } from '../api-codegen/claim-management';
import { ClaimsWithToken } from './claims-with-token';

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    searchClaims(
        limit: number,
        continuationToken?: string,
        claimStatuses?: StatusModificationUnit.StatusEnum[]
    ): Observable<ClaimsWithToken> {
        return this.claimsService.searchClaims(genXRequestID(), limit, undefined, continuationToken, claimStatuses);
    }

    getClaimByID(claimID: number): Observable<Claim> {
        return this.claimsService.getClaimByID(genXRequestID(), claimID);
    }
}
