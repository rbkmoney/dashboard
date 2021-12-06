import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import {
    Claim,
    ClaimsService as APIClaimsService,
    InlineResponse200,
    Modification,
    Reason,
    StatusModificationUnit,
} from '@dsh/api-codegen/claim-management';
import { ContextService } from '@dsh/app/shared/services/context';
import { mapResult, noContinuationToken } from '@dsh/operators';

export const CLAIM_STATUS = StatusModificationUnit.StatusEnum;

@Injectable()
export class ClaimsService {
    constructor(
        private claimsService: APIClaimsService,
        private idGenerator: IdGeneratorService,
        private contextService: ContextService
    ) {}

    searchClaims(
        limit: number,
        claimStatuses?: StatusModificationUnit.StatusEnum[],
        claimID?: number,
        continuationToken?: string
    ): Observable<InlineResponse200> {
        return this.contextService.organization$.pipe(
            first(),
            switchMap((organization) =>
                this.claimsService.searchClaims(
                    this.idGenerator.shortUuid(),
                    organization.id,
                    limit,
                    undefined,
                    continuationToken,
                    claimID,
                    claimStatuses || Object.values(StatusModificationUnit.StatusEnum)
                )
            )
        );
    }

    search1000Claims(claimStatuses?: StatusModificationUnit.StatusEnum[]): Observable<Claim[]> {
        return this.searchClaims(1000, claimStatuses).pipe(noContinuationToken, mapResult);
    }

    getClaimByID(claimID: number): Observable<Claim> {
        return this.contextService.organization$.pipe(
            first(),
            switchMap((organization) =>
                this.claimsService.getClaimByID(this.idGenerator.shortUuid(), organization.id, claimID)
            )
        );
    }

    createClaim(changeset: Modification[]): Observable<Claim> {
        return this.contextService.organization$.pipe(
            first(),
            switchMap((organization) =>
                this.claimsService.createClaim(this.idGenerator.shortUuid(), organization.id, changeset)
            )
        );
    }

    updateClaimByID(claimID: number, claimRevision: number, changeset: Modification[]): Observable<void> {
        return this.contextService.organization$.pipe(
            first(),
            switchMap((organization) =>
                this.claimsService.updateClaimByID(
                    this.idGenerator.shortUuid(),
                    organization.id,
                    claimID,
                    claimRevision,
                    changeset
                )
            )
        );
    }

    revokeClaimByID(claimID: number, claimRevision: number, reason: Reason): Observable<void> {
        return this.contextService.organization$.pipe(
            first(),
            switchMap((organization) =>
                this.claimsService.revokeClaimByID(
                    this.idGenerator.shortUuid(),
                    organization.id,
                    claimID,
                    claimRevision,
                    undefined,
                    reason
                )
            )
        );
    }

    requestReviewClaimByID(claimID: number, claimRevision: number): Observable<void> {
        return this.contextService.organization$.pipe(
            first(),
            switchMap((organization) =>
                this.claimsService.requestReviewClaimByID(
                    this.idGenerator.shortUuid(),
                    organization.id,
                    claimID,
                    claimRevision
                )
            )
        );
    }
}
