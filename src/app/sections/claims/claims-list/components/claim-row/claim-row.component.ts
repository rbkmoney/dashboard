import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Claim } from '../../../../../api-codegen/claim-management/swagger-codegen';

@Component({
    selector: 'dsh-claim-row',
    templateUrl: 'claim-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimRowComponent {
    @Input() claim: Claim;
}
