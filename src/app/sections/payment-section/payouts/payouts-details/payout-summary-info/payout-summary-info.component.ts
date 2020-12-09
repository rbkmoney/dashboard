import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PayoutSummaryItem } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-payout-summary-info',
    templateUrl: 'payout-summary-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayoutSummaryInfoComponent {
    @Input() summary: PayoutSummaryItem;
}
