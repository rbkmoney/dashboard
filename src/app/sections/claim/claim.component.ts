import { Component, OnInit } from '@angular/core';
import { pluck, map } from 'rxjs/operators';

import { ReceiveClaimService } from './receive-claim.service';
import { claimStatusToColor } from '../../view-utils';
import { RevokeClaimService } from './revoke-claim.service';
import { UpdateClaimService } from './update-claim';
import { RouteParamClaimService } from './route-param-claim.service';
import { ReviewClaimService } from './review-claim.service';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.scss'],
    providers: [RouteParamClaimService, ReceiveClaimService, RevokeClaimService, UpdateClaimService, ReviewClaimService]
})
export class ClaimComponent implements OnInit {
    links = [
        {
            path: 'conversation'
        },
        {
            path: 'documents'
        }
    ];

    claimID$ = this.receiveClaimService.claim$.pipe(pluck('id'));
    claimStatus$ = this.receiveClaimService.claim$.pipe(pluck('status'));
    claimStatusColor$ = this.claimStatus$.pipe(map(claimStatusToColor));
    claimType$ = this.receiveClaimService.claimType$;
    claimReceived$ = this.receiveClaimService.claimReceived$;
    error$ = this.receiveClaimService.error$;
    revokeAvailable$ = this.revokeClaimService.revokeAvailable$;
    reviewAvailable$ = this.reviewClaimService.reviewAvailable$;
    reviewInProgress$ = this.reviewClaimService.inProgress$;

    ngOnInit() {
        this.receiveClaimService.receiveClaim();
    }

    revokeClaim() {
        this.revokeClaimService.revokeClaim();
    }

    reviewClaim() {
        this.reviewClaimService.reviewClaim();
    }

    constructor(
        private receiveClaimService: ReceiveClaimService,
        private revokeClaimService: RevokeClaimService,
        private reviewClaimService: ReviewClaimService
    ) {}
}
