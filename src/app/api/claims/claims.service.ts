import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import {
    Claim,
    ClaimsService as APIClaimsService,
    Modification,
    Reason,
    StatusModificationUnit
} from '../../api-codegen/claim-management';
import { mapResult, noContinuationToken } from '../../custom-operators';
import { genXRequestID } from '../utils';

export const ClaimStatus = StatusModificationUnit.StatusEnum;

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    searchClaims(
        limit: number,
        claimStatuses?: StatusModificationUnit.StatusEnum[],
        claimID?: number,
        continuationToken?: string
    ) {
        return this.claimsService.searchClaims(
            genXRequestID(),
            limit,
            undefined,
            continuationToken,
            claimID,
            claimStatuses || Object.values(StatusModificationUnit.StatusEnum)
        );
    }

    search1000Claims(claimStatuses?: StatusModificationUnit.StatusEnum[], cacheSize = 1): Observable<Claim[]> {
        return this.searchClaims(1000, claimStatuses).pipe(noContinuationToken, mapResult, shareReplay(cacheSize));
    }

    getClaimByID(claimID: number): Observable<Claim> {
        return this.claimsService.getClaimByID(genXRequestID(), claimID);
    }

    createClaim(changeset: Modification[]): Observable<Claim> {
        return this.claimsService.createClaim(genXRequestID(), changeset);
    }

    updateClaimByID(claimID: number, claimRevision: number, changeset: Modification[]): Observable<void> {
        return this.claimsService.updateClaimByID(genXRequestID(), claimID, claimRevision, changeset);
    }

    revokeClaimByID(claimID: number, claimRevision: number, reason: Reason): Observable<void> {
        return this.claimsService.revokeClaimByID(genXRequestID(), claimID, claimRevision, undefined, reason);
    }

    requestReviewClaimByID(claimID: number, claimRevision: number): Observable<void> {
        return this.claimsService.requestReviewClaimByID(genXRequestID(), claimID, claimRevision);
    }
}
