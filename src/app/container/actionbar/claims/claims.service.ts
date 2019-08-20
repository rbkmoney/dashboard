import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../claims/claims.service';
import { Claim } from '../../../api/claim-management';
import { OperationStateWrapper } from '../../../operation-state-wrapper';

@Injectable()
export class ClaimsService implements OnDestroy {
    private searchState: OperationStateWrapper;

    constructor(private claimsService: ClaimsApiService) {
        this.searchState = new OperationStateWrapper();
    }

    isLoading(): Observable<boolean> {
        return this.searchState.isLoading();
    }

    isError(): Observable<boolean> {
        return this.searchState.isError();
    }

    getClaims(count = 5): Observable<Claim[]> {
        const searchClaims = this.claimsService.searchClaims(count).pipe(map(({ result }) => result));
        return this.searchState.wrap<Claim[]>(searchClaims);
    }

    ngOnDestroy() {
        this.searchState.dispose();
    }
}
