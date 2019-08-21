import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../claims/claims.service';
import {
    takeExecutionContext,
    takeLoadingContext,
    takeErrorContext,
    takeReceiveContext
} from '../../../take-execution-context';

@Injectable()
export class ClaimsService {
    private claimExecContext$ = this.claimsService.searchClaims(5).pipe(
        map(({ result }) => result),
        takeExecutionContext(),
        shareReplay(1)
    );

    isLoading$ = this.claimExecContext$.pipe(takeLoadingContext());
    error$ = this.claimExecContext$.pipe(takeErrorContext());
    claims$ = this.claimExecContext$.pipe(takeReceiveContext());

    constructor(private claimsService: ClaimsApiService) {}
}
