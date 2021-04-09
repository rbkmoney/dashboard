import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PayoutToolDetails } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-payout-tool-details',
    templateUrl: 'payout-tool-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutToolDetailsComponent {
    @Input() payoutToolDetails: PayoutToolDetails;
}
