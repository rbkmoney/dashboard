import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PayoutSummaryItem } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-refunds-info',
    templateUrl: 'refunds-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefundsInfoComponent {
    @Input() refundsSummary: PayoutSummaryItem;
}
