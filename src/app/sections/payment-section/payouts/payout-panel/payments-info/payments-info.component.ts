import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { PayoutSummaryItem } from '../../../../../api-codegen/anapi';

@Component({
    selector: 'dsh-payments-info',
    templateUrl: 'payments-info.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsInfoComponent {
    @Input() paymentsSummary: PayoutSummaryItem;
}
