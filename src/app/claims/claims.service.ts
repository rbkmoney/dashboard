import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';
import * as moment from 'moment';

import { genXRequestID } from '../api';
import { Claim, ClaimsService as APIClaimsService, ModificationUnit } from '../api/claim-management';
import { StatusColor } from '../theme-manager';
import { LocaleDictionaryService } from '../locale';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface ViewClaim extends Omit<Claim, 'createdAt' | 'updatedAt' | 'changeset'> {
    createdAt: moment.Moment;
    updatedAt: moment.Moment;
    changeset: (Omit<ModificationUnit, 'createdAt'> & { createdAt: moment.Moment })[];
}

const claimStatuses = ['pending', 'pendingAcceptance', 'review', 'revoked', 'denied', 'accepted'] as const;

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService, private localeDictionaryService: LocaleDictionaryService) {}

    toViewClaim(claim: Claim): ViewClaim {
        return {
            ...claim,
            updatedAt: moment(claim.updatedAt),
            createdAt: moment(claim.createdAt),
            changeset: claim.changeset.map(unit => ({
                ...unit,
                createdAt: moment(unit.createdAt)
            }))
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

    getClaimStatusColor(status: string): StatusColor {
        return {
            pending: StatusColor.pending,
            pendingAcceptance: StatusColor.pending,
            review: StatusColor.pending,
            revoked: StatusColor.warn,
            denied: StatusColor.warn,
            accepted: StatusColor.success
        }[status];
    }

    getLocalizedClaimStatus(status: string): string {
        if (status) {
            return this.localeDictionaryService.mapDictionaryKey(`common.claim.status.${status}`);
        }
    }
}
