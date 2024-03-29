import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';

import { ReceiveClaimService } from './receive-claim.service';
import { ReviewClaimService } from './review-claim.service';
import { RevokeClaimService } from './revoke-claim.service';
import { RouteParamClaimService } from './route-param-claim.service';
import { UpdateClaimService } from './update-claim';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.scss'],
    providers: [
        RouteParamClaimService,
        ReceiveClaimService,
        RevokeClaimService,
        UpdateClaimService,
        ReviewClaimService,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimComponent implements OnInit {
    claimID$ = this.receiveClaimService.claim$.pipe(pluck('id'));
    claimStatus$ = this.receiveClaimService.claim$.pipe(pluck('status'));
    claimReceived$ = this.receiveClaimService.claimReceived$;
    error$ = this.receiveClaimService.error$;
    revokeAvailable$ = this.revokeClaimService.revokeAvailable$;
    reviewAvailable$ = this.reviewClaimService.reviewAvailable$;
    reviewInProgress$ = this.reviewClaimService.inProgress$;

    constructor(
        private receiveClaimService: ReceiveClaimService,
        private revokeClaimService: RevokeClaimService,
        private reviewClaimService: ReviewClaimService
    ) {}

    ngOnInit() {
        this.receiveClaimService.receiveClaim();
    }

    revokeClaim() {
        this.revokeClaimService.revokeClaim();
    }

    reviewClaim() {
        this.reviewClaimService.reviewClaim();
    }
}
