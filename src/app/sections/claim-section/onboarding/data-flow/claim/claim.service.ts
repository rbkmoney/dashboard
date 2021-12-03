import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, defer } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';
import { ContextService } from '@dsh/app/shared/services/context';

@Injectable()
export class ClaimService {
    claim$ = combineLatest([this.route.params, this.contextService.organization$, defer(() => this.loadClaim$)]).pipe(
        switchMap(([{ claimID }, org]) => this.claimsService.getClaimByID(org.id, claimID)),
        shareReplay(1)
    );

    private loadClaim$ = new BehaviorSubject<void>(undefined);

    constructor(
        private route: ActivatedRoute,
        private claimsService: ClaimsService,
        private contextService: ContextService
    ) {}

    reloadClaim(): void {
        this.loadClaim$.next();
    }
}
