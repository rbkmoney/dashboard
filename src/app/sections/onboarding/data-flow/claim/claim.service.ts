import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';

@Injectable()
export class ClaimService {
    private loadClaim$ = new BehaviorSubject<void>(undefined);

    claim$ = combineLatest([this.route.params, this.loadClaim$]).pipe(
        switchMap(([{ claimID }]) => this.claimsService.getClaimByID(claimID)),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private claimsService: ClaimsService) {}

    reloadClaim() {
        this.loadClaim$.next();
    }
}
