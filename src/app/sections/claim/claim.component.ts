import { Component, OnInit } from '@angular/core';
import { pluck, map } from 'rxjs/operators';

import { ReceiveClaimService } from './receive-claim.service';
import { claimStatusToColor, getClaimType } from '../../view-utils';
import { RevokeClaimService } from './revoke-claim.service';
import { UpdateClaimService } from './update-claim.service';
import { RouteParamClaimService } from './route-param-claim.service';

@Component({
    templateUrl: 'claim.component.html',
    styleUrls: ['claim.component.scss'],
    providers: [RouteParamClaimService, ReceiveClaimService, RevokeClaimService, UpdateClaimService]
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
    claimType$ = this.receiveClaimService.claim$.pipe(
        pluck('changeset'),
        map(getClaimType)
    );
    claimReceived$ = this.receiveClaimService.claimReceived$;
    error$ = this.receiveClaimService.error$;
    revokeAvailable$ = this.revokeClaimService.revokeAvailable$;

    ngOnInit() {
        this.receiveClaimService.receiveClaim();
    }

    revokeClaim() {
        this.revokeClaimService.revokeClaim();
    }

    constructor(private receiveClaimService: ReceiveClaimService, private revokeClaimService: RevokeClaimService) {}
}
