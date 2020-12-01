import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Claim } from '../../../../api-codegen/claim-management/swagger-codegen';

@Component({
    selector: 'dsh-claim-details',
    templateUrl: 'claim-details.component.html',
})
export class ClaimDetailsComponent {
    @Input() claim: Claim;

    constructor(private router: Router) {}

    goToClaimDetails({ id }: Claim) {
        this.router.navigate(['claim', id]);
    }
}
