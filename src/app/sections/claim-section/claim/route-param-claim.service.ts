import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { ClaimsService } from '@dsh/api/claims';
import { ContextService } from '@dsh/app/shared/services/context';

@Injectable()
export class RouteParamClaimService {
    claim$ = combineLatest([this.contextService.organization$, this.route.params.pipe(pluck('claimId'))]).pipe(
        switchMap(([org, id]) => this.claimsService.getClaimByID(org.id, id))
    );

    constructor(
        private route: ActivatedRoute,
        private claimsService: ClaimsService,
        private contextService: ContextService
    ) {}
}
