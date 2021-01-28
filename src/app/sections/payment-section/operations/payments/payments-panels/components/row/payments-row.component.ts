import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PaymentSearchResult } from '@dsh/api-codegen/anapi';

@Component({
    selector: 'dsh-payments-row',
    templateUrl: 'payments-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsRowComponent {
    @Input() payment: PaymentSearchResult;
}
