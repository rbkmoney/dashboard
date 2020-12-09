import { Component, Input } from '@angular/core';

import { Claim } from '@dsh/api-codegen/claim-management/swagger-codegen';

@Component({
    selector: 'dsh-claim-details',
    templateUrl: 'claim-details.component.html',
})
export class ClaimDetailsComponent {
    @Input() claim: Claim;
}
