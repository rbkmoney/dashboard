import { Component, Input } from '@angular/core';

import { ClaimsService, Claim } from '../../../api/claim-management';
import { StatusColor } from '../../../theme-manager';
import { genXRequestID } from '../../../api';

@Component({
    selector: 'dsh-claims',
    templateUrl: 'claims.component.html',
    styleUrls: ['claims.component.scss']
})
export class ClaimsComponent {
    @Input()
    closeDropdown: () => void;

    claims: any[];

    constructor(private claimManagement: ClaimsService) {
        this.claimManagement.searchClaims(genXRequestID(), 5).subscribe(({ result }) => {
            this.claims = result.map(claim => this.toCleanClaim(claim));
        });
    }

    toCleanClaim(claim: Claim) {
        const colorMapping = {
            pending: StatusColor.pending,
            pendingAcceptance: StatusColor.pending,
            review: StatusColor.pending,
            revoked: StatusColor.warn,
            denied: StatusColor.warn,
            accepted: StatusColor.success
        };
        const statusMapping = {
            pendingAcceptance: 'pending acceptance'
        };
        return {
            status: statusMapping[claim.status] || claim.status,
            color: colorMapping[claim.status],
            title: claim.status,
            id: claim.id
        };
    }

    actionHandler({ isMoving }) {
        if (isMoving) {
            this.closeDropdown();
        }
    }
}
