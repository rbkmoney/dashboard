import { Injectable } from '@angular/core';
import { switchMap, map, share } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';

import { genXRequestID } from '../api';
import { ClaimsService as APIClaimsService } from '../api/claim-management';
import { ViewClaim } from './view-claim';

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    getClaims(count: number = 5, interval?: number): Observable<ViewClaim[]> {
        if (interval) {
            return timer(0, interval).pipe(
                switchMap(() => this.getClaims(count)),
                share()
            );
        }
        return this.claimsService.searchClaims(genXRequestID(), count).pipe(
            map(({ result }) => result.map(claim => new ViewClaim(claim))),
            share()
        );
    }

    getClaim(claimID: number, interval?: number): Observable<ViewClaim> {
        if (interval) {
            return timer(0, interval).pipe(
                switchMap(() => this.getClaim(claimID)),
                share()
            );
        }
        return this.claimsService.getClaimByID(genXRequestID(), claimID).pipe(
            map(claim => new ViewClaim(claim)),
            share()
        );
    }
}
