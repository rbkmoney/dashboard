import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { combineLatest, Observable } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { TranslocoService } from '@ngneat/transloco';

import { ClaimsService as ApiClaimsService } from '../../api/claims/claims.service';
import { ClaimSearchFormValue } from './search-form';
import { ClaimsTableData } from './table';
import { Claim } from '../../api-codegen/claim-management/swagger-codegen';
import { FetchResult, PartialFetcher } from '../partial-fetcher';
import { mapToClaimsTableData } from './map-to-claims-table-data';
import { booleanDebounceTime } from '../../custom-operators';

@Injectable()
export class ClaimsService extends PartialFetcher<Claim, ClaimSearchFormValue> {
    private readonly searchLimit = 20;

    claimsTableData$: Observable<ClaimsTableData[]> = combineLatest(this.searchResult$).pipe(
        mapToClaimsTableData,
        catchError(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        })
    );

    isLoading$: Observable<boolean> = this.doAction$.pipe(
        booleanDebounceTime(),
        shareReplay(1)
    );

    constructor(
        private claimsService: ApiClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        super();
    }

    protected fetch(params: ClaimSearchFormValue, continuationToken: string): Observable<FetchResult<Claim>> {
        return this.claimsService.searchClaims(this.searchLimit, params.claimStatus, params.claimID, continuationToken);
    }
}
