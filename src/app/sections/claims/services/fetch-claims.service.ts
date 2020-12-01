import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Claim } from '../../../api-codegen/claim-management/swagger-codegen';
import { ClaimsService } from '../../../api/claims';
import { booleanDebounceTime } from '../../../custom-operators';
import { FetchResult, PartialFetcher } from '../../partial-fetcher';
import { mapToTimestamp } from '../../payment-section/operations/operators';
import { ClaimSearchFormValue } from '../search-form';

@Injectable()
export class FetchClaimsService extends PartialFetcher<Claim, ClaimSearchFormValue> {
    private readonly searchLimit = 10;

    lastUpdated$: Observable<string> = this.searchResult$.pipe(mapToTimestamp);
    isLoading$: Observable<boolean> = this.doAction$.pipe(booleanDebounceTime(), shareReplay(1));

    constructor(
        private claimsService: ClaimsService,
        private snackBar: MatSnackBar,
        private transloco: TranslocoService
    ) {
        super();
        this.errors$.subscribe(() => {
            this.snackBar.open(this.transloco.translate('httpError'), 'OK');
            return [];
        });
    }

    protected fetch(params: ClaimSearchFormValue, continuationToken: string): Observable<FetchResult<Claim>> {
        return this.claimsService.searchClaims(this.searchLimit, params.claimStatus, params.claimID, continuationToken);
    }
}
