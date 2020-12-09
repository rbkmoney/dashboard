import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Claim } from '@dsh/api-codegen/claim-management/swagger-codegen';

@Component({
    selector: 'dsh-claim-info',
    templateUrl: 'claim-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClaimInfoComponent {
    @Input() claim: Claim;
}
