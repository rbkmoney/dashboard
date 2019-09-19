import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

import { takeRouteParam } from '../../../custom-operators';
import { ClaimsService } from '../../../api';
import { Claim } from '../../../api-codegen/claim-management';

@Injectable()
export class DataFlowService {
    claim$: Observable<Claim> = this.route.params.pipe(
        takeRouteParam('claimID'),
        switchMap(claimID => this.claimService.getClaimByID(claimID)),
        shareReplay(1)
    );

    constructor(private route: ActivatedRoute, private claimService: ClaimsService) {}
}
