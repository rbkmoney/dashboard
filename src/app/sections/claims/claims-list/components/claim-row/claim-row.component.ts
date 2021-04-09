import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Claim } from '@dsh/api-codegen/claim-management/swagger-codegen';

@Component({
    selector: 'dsh-claim-row',
    templateUrl: 'claim-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimRowComponent {
    @Input() claim: Claim;

    @Output() goToClaimDetails: EventEmitter<number> = new EventEmitter();
}
