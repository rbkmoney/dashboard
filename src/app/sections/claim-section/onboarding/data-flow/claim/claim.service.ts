import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, defer } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';

@Injectable()
export class ClaimService {
    claim$ = combineLatest([this.route.params, defer(() => this.loadClaim$)]).pipe(
        switchMap(([{ claimID }]) => this.claimsService.getClaimByID(claimID)),
        shareReplay(1)
    );

    private loadClaim$ = new BehaviorSubject<void>(undefined);

    constructor(private route: ActivatedRoute, private claimsService: ClaimsService) {}

    reloadClaim(): void {
        this.loadClaim$.next();
    }
}
