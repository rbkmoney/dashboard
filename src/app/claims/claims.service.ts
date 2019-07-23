import { Injectable } from '@angular/core';
import { map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { genXRequestID } from '../api';
import { ClaimsService as APIClaimsService } from '../api/claim-management';
import { ViewClaim } from './view-claim';

@Injectable()
export class ClaimsService {
    constructor(private claimsService: APIClaimsService) {}

    getClaims(count: number = 5): Observable<ViewClaim[]> {
        return this.claimsService.searchClaims(genXRequestID(), count).pipe(
            map(({ result }) => result.map(claim => new ViewClaim(claim))),
            share()
        );
    }

    getClaim(claimID): Observable<ViewClaim> {
        return this.claimsService.getClaimByID(genXRequestID(), claimID).pipe(
            map(claim => new ViewClaim(claim)),
            share()
        );
    }
}
