import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PaymentSearchResult } from '../../../../api-codegen/capi/swagger-codegen';

@Component({
    selector: 'dsh-payment-details',
    templateUrl: 'payment-details.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentDetailsComponent {
    @Input() payment: PaymentSearchResult;
}
