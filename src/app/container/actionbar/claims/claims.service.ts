import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, delay, filter, shareReplay } from 'rxjs/operators';

import { ClaimsService as ClaimsApiService } from '../../../claims/claims.service';
import { Claim } from '../../../api/claim-management';
import {
    takeExecutionContext,
    ExecutionLoadingEvent,
    ExecutionReceiveEvent,
    ExecutionErrorEvent
} from '../../../take-execution-context';

@Injectable()
export class ClaimsService {
    private claimExecContext$ = this.claimsService.searchClaims(5).pipe(
        map(({ result }) => result),
        delay(6000),
        takeExecutionContext(),
        shareReplay(1)
    );

    constructor(private claimsService: ClaimsApiService) {}

    isLoading(): Observable<boolean> {
        return this.claimExecContext$.pipe(
            filter(({ type }) => type === 'Loading'),
            map(({ isLoading }: ExecutionLoadingEvent) => isLoading)
        );
    }

    isError(): Observable<boolean> {
        return this.claimExecContext$.pipe(
            filter(({ type }) => type === 'Error'),
            map(({ error }: ExecutionErrorEvent<any>) => !!error)
        );
    }

    getClaims(): Observable<Claim[]> {
        return this.claimExecContext$.pipe(
            filter(({ type }) => type === 'Receive'),
            map(({ value }: ExecutionReceiveEvent<Claim[]>) => value)
        );
    }
}
