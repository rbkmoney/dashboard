import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, delay } from 'rxjs/operators';

import { ClaimsService as APIClaimsService, Claim, StatusModificationUnit } from '../../api-codegen/claim-management';
import { ClaimsWithToken } from './claims-with-token';
import { genXRequestID } from '../gen-x-request-id';
import { noContinuationToken, mapResult } from '../../custom-operators';

export const ClaimStatus = StatusModificationUnit.StatusEnum;

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

    search1000Claims(claimStatuses?: StatusModificationUnit.StatusEnum[], cacheSize = 1): Observable<Claim[]> {
        return this.searchClaims(1000, null, claimStatuses).pipe(
            // noContinuationToken,
            mapResult,
            shareReplay(cacheSize),
            delay(1000)
        );
    }

    getClaimByID(claimID: number): Observable<Claim> {
        return this.claimsService.getClaimByID(genXRequestID(), claimID);
    }
}
