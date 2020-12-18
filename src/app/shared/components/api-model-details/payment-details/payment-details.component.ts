import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PaymentSearchResult } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-payment-details',
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDetailsComponent {
    @Input() payment: PaymentSearchResult;
}
