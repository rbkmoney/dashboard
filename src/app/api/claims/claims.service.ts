import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';

import {
    Claim,
    ClaimsService as APIClaimsService,
    InlineResponse200,
    Modification,
    Reason,
    StatusModificationUnit,
} from '@dsh/api-codegen/claim-management';
import { mapResult, noContinuationToken } from '@dsh/operators';

export const CLAIM_STATUS = StatusModificationUnit.StatusEnum;

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService, private idGenerator: IdGeneratorService) {}

    searchClaims(
        partyId: string,
        limit: number,
        claimStatuses?: StatusModificationUnit.StatusEnum[],
        claimID?: number,
        continuationToken?: string
    ): Observable<InlineResponse200> {
        return this.claimsService.searchClaims(
            this.idGenerator.shortUuid(),
            partyId,
            limit,
            undefined,
            continuationToken,
            claimID,
            claimStatuses || Object.values(StatusModificationUnit.StatusEnum)
        );
    }

    search1000Claims(partyId: string, claimStatuses?: StatusModificationUnit.StatusEnum[]): Observable<Claim[]> {
        return this.searchClaims(partyId, 1000, claimStatuses).pipe(noContinuationToken, mapResult);
    }

    getClaimByID(partyId: string, claimID: number): Observable<Claim> {
        return this.claimsService.getClaimByID(this.idGenerator.shortUuid(), partyId, claimID);
    }

    createClaim(partyId: string, changeset: Modification[]): Observable<Claim> {
        return this.claimsService.createClaim(this.idGenerator.shortUuid(), partyId, changeset);
    }

    updateClaimByID(
        partyId: string,
        claimID: number,
        claimRevision: number,
        changeset: Modification[]
    ): Observable<void> {
        return this.claimsService.updateClaimByID(
            this.idGenerator.shortUuid(),
            partyId,
            claimID,
            claimRevision,
            changeset
        );
    }

    revokeClaimByID(partyId: string, claimID: number, claimRevision: number, reason: Reason): Observable<void> {
        return this.claimsService.revokeClaimByID(
            this.idGenerator.shortUuid(),
            partyId,
            claimID,
            claimRevision,
            undefined,
            reason
        );
    }

    requestReviewClaimByID(partyId: string, claimID: number, claimRevision: number): Observable<void> {
        return this.claimsService.requestReviewClaimByID(this.idGenerator.shortUuid(), partyId, claimID, claimRevision);
    }
}
