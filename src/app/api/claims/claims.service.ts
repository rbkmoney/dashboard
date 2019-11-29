import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import {
    ClaimsService as APIClaimsService,
    Claim,
    StatusModificationUnit,
    ClaimChangeset,
    Modification
} from '../../api-codegen/claim-management';
import { ClaimsWithToken } from './models';
import { genXRequestID } from '../utils';
import { noContinuationToken, mapResult } from '../../custom-operators';

export const ClaimStatus = StatusModificationUnit.StatusEnum;

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    searchClaims(
        limit: number,
        claimStatuses?: StatusModificationUnit.StatusEnum[],
        continuationToken?: string
    ): Observable<ClaimsWithToken> {
        return this.claimsService.searchClaims(
            genXRequestID(),
            limit,
            undefined,
            continuationToken,
            claimStatuses || Object.values(StatusModificationUnit.StatusEnum)
        );
    }

    search1000Claims(claimStatuses?: StatusModificationUnit.StatusEnum[], cacheSize = 1): Observable<Claim[]> {
        return this.searchClaims(1000, claimStatuses).pipe(
            noContinuationToken,
            mapResult,
            shareReplay(cacheSize)
        );
    }

    getClaimByID(claimID: number): Observable<Claim> {
        return this.claimsService.getClaimByID(genXRequestID(), claimID);
    }

    createClaim(claimChangeset: ClaimChangeset): Observable<Claim> {
        return this.claimsService.createClaim(genXRequestID(), claimChangeset);
    }

    updateClaimByID(claimID: number, claimRevision: number, changeset: Modification[]): Observable<any> {
        return this.claimsService.updateClaimByID(genXRequestID(), claimID, claimRevision, changeset);
    }
}
