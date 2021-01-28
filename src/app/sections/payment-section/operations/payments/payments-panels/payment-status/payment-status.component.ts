import { Component, Input } from '@angular/core';

import { PaymentSearchResult } from '@dsh/api-codegen/capi';

@Component({
    selector: 'dsh-payment-status',
    templateUrl: './payment-status.component.html',
})
export class PaymentStatusComponent {
    @Input() status: PaymentSearchResult.StatusEnum;
}
