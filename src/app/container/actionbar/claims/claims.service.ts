import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../claims/claims.service';
import { Claim } from '../../../api/claim-management';
import { OperationStateWrapper } from '../../../operation-state-wrapper';

@Injectable()
export class ClaimsService {
    private searchState: OperationStateWrapper;

    isLoading(): Observable<boolean> {
        return this.searchState.isLoading();
    }

    isError(): Observable<boolean> {
        return this.searchState.isError();
    }

    constructor(private claimsService: ClaimsApiService) {
        this.searchState = new OperationStateWrapper();
    }

    getClaims(count = 5): Observable<Claim[]> {
        const searchClaims = this.claimsService.searchClaims(count).pipe(
            map(({ result }) => result),
            delay(6000)
        );
        return this.searchState.wrap<Claim[]>(searchClaims);
    }
}
