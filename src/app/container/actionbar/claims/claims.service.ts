import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../claims/claims.service';
import { Claim } from '../../../api/claim-management';
import {
    takeExecutionContext,
    takeLoadingContext,
    takeErrorContext,
    takeReceiveContext
} from '../../../take-execution-context';

type Error = any;

@Injectable()
export class ClaimsService {
    private claimExecContext$ = this.claimsService.searchClaims(5).pipe(
        map(({ result }) => result),
        takeExecutionContext(),
        shareReplay(1)
    );

    constructor(private claimsService: ClaimsApiService) {}

    isLoading(): Observable<boolean> {
        return this.claimExecContext$.pipe(takeLoadingContext());
    }

    getError(): Observable<Error> {
        return this.claimExecContext$.pipe(takeErrorContext<Error>());
    }

    getClaims(): Observable<Claim[]> {
        return this.claimExecContext$.pipe(takeReceiveContext());
    }
}
