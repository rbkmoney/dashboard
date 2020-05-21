import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck, switchMap } from 'rxjs/operators';

import { ClaimsService } from '../../api';

@Injectable()
export class RouteParamClaimService {
    claim$ = this.route.params.pipe(
        pluck('claimId'),
        switchMap((id) => this.claimsService.getClaimByID(id))
    );

    constructor(private route: ActivatedRoute, private claimsService: ClaimsService) {}
}
