import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { ClaimsService } from '../../../../api';

@Injectable()
export class ClaimService {
    private loadClaim$ = new BehaviorSubject<void>(undefined);

    cliam$ = combineLatest([this.route.params, this.loadClaim$]).pipe(
        switchMap(([{ claimID }]) => this.claimsService.getClaimByID(claimID)),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private claimsService: ClaimsService) {}

    reloadCliam() {
        this.loadClaim$.next();
    }
}