import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';
import * as moment from 'moment';

import { genXRequestID } from '../api';
import { Claim, ClaimsService as APIClaimsService } from '../api/claim-management';
import { StatusColor } from '../theme-manager';

export interface ViewClaim extends Pick<Claim, Exclude<keyof Claim, 'createdAt' | 'updatedAt' | 'changeset'>> {
    color: StatusColor;
    title: string;
    createdAt: moment.Moment;
    updatedAt: moment.Moment;
    changeset: any;
}

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    toViewClaim(claim: Claim): ViewClaim {
        const colorMapping = {
            pending: StatusColor.pending,
            pendingAcceptance: StatusColor.pending,
            review: StatusColor.pending,
            revoked: StatusColor.warn,
            denied: StatusColor.warn,
            accepted: StatusColor.success
        };
        const statusMapping = {
            pendingAcceptance: 'В ожидании принятия'
        };
        return {
            ...claim,
            status: statusMapping[claim.status] || claim.status,
            color: colorMapping[claim.status],
            title: claim.status,
            updatedAt: moment(claim.updatedAt),
            createdAt: moment(claim.createdAt),
            changeset: claim.changeset.map(change => {
                return {
                    ...change,
                    createdAt: moment(change.createdAt)
                };
            })
        };
    }

    getClaims(count: number = 5, interval?: number): Observable<ViewClaim[]> {
        if (interval) {
            return timer(0, interval).pipe(switchMap(() => this.getClaims(count)));
        }
        return this.claimsService
            .searchClaims(genXRequestID(), count)
            .pipe(map(({ result }) => result.map(claim => this.toViewClaim(claim))));
    }

    getClaim(claimID: number, interval?: number): Observable<ViewClaim> {
        if (interval) {
            return timer(0, interval).pipe(switchMap(() => this.getClaim(claimID)));
        }
        return this.claimsService.getClaimByID(genXRequestID(), claimID).pipe(map(claim => this.toViewClaim(claim)));
    }
}
