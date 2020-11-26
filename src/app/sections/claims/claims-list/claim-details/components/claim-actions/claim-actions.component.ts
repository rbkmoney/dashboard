import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Claim } from '../../../../../../api-codegen/claim-management/swagger-codegen';

@Component({
    selector: 'dsh-claim-actions',
    templateUrl: 'claim-actions.component.html',
    styleUrls: ['claim-actions.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimActionsComponent {
    @Input() claim: Claim;

    constructor(private router: Router) {}

    goToClaimDetails({ id }: Claim) {
        this.router.navigate(['claim', id]);
    }
}
