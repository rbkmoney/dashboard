import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { PayoutToolDetails } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-payout-tool-info',
    templateUrl: 'payout-tool-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PayoutToolInfoComponent {
    @Input() payoutToolDetails: PayoutToolDetails;
}
