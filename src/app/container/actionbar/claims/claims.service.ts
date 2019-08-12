import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../claims/claims.service';
import { Claim } from '../../../api/claim-management';

@Injectable()
export class ClaimsService {
    constructor(private claimsService: ClaimsApiService) {}

    getClaims(count = 5): Observable<Claim[]> {
        return this.claimsService.searchClaims(count).pipe(map(({ result }) => result));
    }
}
