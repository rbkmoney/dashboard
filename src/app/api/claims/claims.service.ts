import { Injectable } from '@angular/core';
import { IdGeneratorService } from '@rbkmoney/id-generator';
import { Observable } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import {
    Claim,
    ClaimsService as APIClaimsService,
    Modification,
    Reason,
    StatusModificationUnit,
} from '@dsh/api-codegen/claim-management';

import { KeycloakTokenInfoService } from '@dsh/app/shared';
import { mapResult, noContinuationToken } from '@dsh/operators';

export const CLAIM_STATUS = StatusModificationUnit.StatusEnum;

// TODO: refactor this service as claim requests service
@Injectable()
export class ClaimsService {
    private partyID$: Observable<string> = this.keycloakTokenInfoService.partyID$;

    constructor(private claimsService: APIClaimsService, private keycloakTokenInfoService: KeycloakTokenInfoService, private idGenerator: IdGeneratorService) {}

    searchClaims(
        limit: number,
        claimStatuses?: StatusModificationUnit.StatusEnum[],
        claimID?: number,
        continuationToken?: string
    ) {
        return this.claimsService.searchClaims(
            this.idGenerator.shortUuid(),
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
        return this.claimsService.getClaimByID(this.idGenerator.shortUuid(), claimID);
    }

    createClaim(changeset: Modification[]): Observable<Claim> {
        return this.partyID$.pipe(switchMap((partyID) => this.claimsService.createClaim(this.idGenerator.shortUuid(), partyID, changeset)));
    }

    updateClaimByID(claimID: number, claimRevision: number, changeset: Modification[]): Observable<void> {
        return this.partyID$.pipe(switchMap((partyID) => this.claimsService.updateClaimByID(this.idGenerator.shortUuid(), partyID, claimID, claimRevision, changeset)));
    }

    revokeClaimByID(claimID: number, claimRevision: number, reason: Reason): Observable<void> {
        return this.partyID$.pipe(switchMap((partyID) => this.claimsService.revokeClaimByID(
            this.idGenerator.shortUuid(),
            partyID,
            claimID,
            claimRevision,
            undefined,
            reason
        )));
    }

    requestReviewClaimByID(claimID: number, claimRevision: number): Observable<void> {
        return this.partyID$.pipe(switchMap((partyID) => this.claimsService.requestReviewClaimByID(this.idGenerator.shortUuid(), partyID, claimID, claimRevision)));
    }
}
